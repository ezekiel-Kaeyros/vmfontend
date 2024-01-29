import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { AdminService } from 'src/app/services/admin.service';
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
              private router: Router,
              private adminService: AdminService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.projectService.getProject(id).subscribe(
      (response) => {
        console.log(response);
        this.project = response;
      }
    );
  }

  isAdmin() {
    return this.adminService.isLoggedIn()
  }

  editProject() {
    this.router.navigateByUrl(`/projects/1/edit`);
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id ?? 0).subscribe(
      (response) => {
        console.log(response);
        this.projectService.emitProjectSubject();
        this.router.navigate(['/projects/list']);
      }
    )
  }

}
