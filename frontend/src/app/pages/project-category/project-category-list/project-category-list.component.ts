import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { ProjectCategoryService } from 'src/app/services/project-category.service';

@Component({
  selector: 'app-project-category-list',
  templateUrl: './project-category-list.component.html',
  styleUrls: ['./project-category-list.component.css']
})
export class ProjectCategoryListComponent {
  showSpinner: boolean = true;

  projectCategories: ProjectCategory[] = [];
  projectCategorySubscription$: Subscription;

  displayedColumns: string[] = ['position', 'name', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<ProjectCategory>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
              private projectCategoryService: ProjectCategoryService,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.projectCategoryService.getAllCategorys();
    
    this.projectCategorySubscription$ = this.projectCategoryService.projectCategorySubject$.subscribe(
      (response: ProjectCategory[]) => {
        this.projectCategories = response;
        this.projectCategories = [...this.projectCategories.map(x => JSON.parse(JSON.stringify(x)))];
        this.projectCategories = this.projectCategories.map(projectCategory => {
          if (projectCategory.description) {
            let subDes = projectCategory.description.replace(/<(.+?)>/g, '');
            if (subDes.length > 40) {
              subDes = subDes.substring(0, 40);
              subDes = subDes.substring(0, subDes.lastIndexOf(' '));
              subDes += '...';
            }
            projectCategory.description = subDes;
          }
          return projectCategory;
        });
        this.showSpinner = false;
        this.dataSource = new MatTableDataSource(this.projectCategories);
        console.log("Category list", this.dataSource);
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

  deleteCategory(projectCategory: ProjectCategory) {
    this.projectCategoryService.deleteProjectCategory(projectCategory.id ?? 0).subscribe(
      (response) => {
        this.projectCategoryService.getAllCategorys();
        this.router.navigate(['/project-category/list']);
        console.log('Deleted successfully: ' + response);
      }
    );
  }

  ngOnDestroy(): void {
    this.projectCategorySubscription$.unsubscribe();
  }
}
