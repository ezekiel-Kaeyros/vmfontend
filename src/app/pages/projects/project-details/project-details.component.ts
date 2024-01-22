import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  project: Project;
  apiUrl = environment.apiUrl;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.projectService.getProject(id).subscribe(
      (response: Project) => {
        response.photoUrl = response.photoUrl ? `${this.apiUrl}/media/${response.photoUrl}` : '';
        response.logoUrl = response.logoUrl ? `${this.apiUrl}/media/${response.logoUrl}` : '';
        response.sponsorLogoUrl = response.sponsorLogoUrl ? `${this.apiUrl}/media/${response.sponsorLogoUrl}` : '';
        this.project = response;
      }
    )
  }

  deleteProject(project: Project) {
    this.projectService.projects = this.projectService.projects.filter(x => x.id !== project.id);
    this.projectService.emitProjectSubject();
    this.router.navigate(['/projects/list']);
  }

}
