import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  showSpinner: boolean = true;

  projects: Project[] = [];
  projectSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'title', 'description', 'createdAt', 'edit', 'delete'];
  dataSource: MatTableDataSource<Project>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private projectService: ProjectService,
              private router: Router) {}

  ngOnInit(): void {
    this.projectService.getAllProjects();
    this.projectSubscription$ = this.projectService.projectSubject$.subscribe(
      (response: Project[]) => {
        this.projects = response;
        this.projects = [...this.projects.map(x => JSON.parse(JSON.stringify(x)))];
        this.projects = this.projects.map(project => {
          let subDes = project.description.replace(/<(.+?)>/g, '');
          if (subDes.length > 40) {
            subDes = subDes.substring(0, 40);
            subDes = subDes.substring(0, subDes.lastIndexOf(' '));
            subDes += '...';
          }
          project.description = subDes;
          return project;
        });
        this.showSpinner = false;
    
        this.dataSource = new MatTableDataSource(this.projects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id ?? 0).subscribe(
      (response) => {
        this.ngOnInit();
        console.log('Deleted successfully: ' + response);
      }
    )
  }

  ngOnDestroy(): void {
    this.projectSubscription$.unsubscribe();
  }

}
