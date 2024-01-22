import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  breakpoint: number;
  gutter: string;

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
          let subDes = project.description.replace(/<(.+?)>/g, '');
          if (subDes.length > 250) {
            subDes = subDes.substring(0, 250);
            subDes = subDes.substring(0, subDes.lastIndexOf(' '));
            subDes += '...';
          }
          project.description = subDes;
          project.photoUrl = project.photoUrl ? `${this.apiUrl}/media/${project.photoUrl}` : '';
          project.logoUrl = project.logoUrl ? `${this.apiUrl}/media/${project.logoUrl}` : '';
          project.sponsorLogoUrl = project.sponsorLogoUrl ? `${this.apiUrl}/media/${project.sponsorLogoUrl}` : '';
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
    window.location.href = project.link ?? '';
  }

  ngOnDestroy(): void {
    this.projectSubscription$.unsubscribe();
  }

}
