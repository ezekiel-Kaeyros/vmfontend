import { Component, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  apiUrl = environment.apiUrl;
  listOfProjects = this.projectService.projects;

  breakpoint: number;
  gutter: string;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  showSpinner: boolean = true;

  projects: Project[] = [];
  projectSubscription$: Subscription;

  pagedList: Project[] = [];
  length: number = 0;
  pageSize: number = 6;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    if (window.innerWidth <= 576) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 992) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1400) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  
    this.projectService.getAllProjects();

    this.projectSubscription$ = this.projectService.projectSubject$.subscribe((response: Project[]) => {
        this.projects = [...response.map(x => JSON.parse(JSON.stringify(x)))];
        this.projects = this.projects.map(project => {
          let subDes = project.content.replace(/<(.+?)>/g, '');
          if (subDes.length > 250) {
            subDes = subDes.substring(0, 250);
            subDes = subDes.substring(0, subDes.lastIndexOf(' '));
            subDes += '...';
          }
          project.content = subDes;
          project.project_image_url = project.project_image_url ? `${this.apiUrl}/media/${project.project_image_url}` : '';
          project.project_icon_url = project.project_icon_url ? `${this.apiUrl}/media/${project.project_icon_url}` : '';
          //project.sponsor_images_urls = project.sponsor_images_urls ? `${this.apiUrl}/media/${project.sponsor_images_urls}` : '';
          return project;
        });
        this.pagedList = this.projects.slice(0, 6);
        this.length = this.projects.length;
        this.showSpinner = false;
      }
    ); 
  }
  
  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedList = this.projects.slice(startIndex, endIndex);
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 576) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 992) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 1200) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 1400) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }

  learnMore(project: Project) {
    //window.location.href = project. ?? '';
  }

  ngOnDestroy(): void {
    this.projectSubscription$.unsubscribe();
  }
  
}
