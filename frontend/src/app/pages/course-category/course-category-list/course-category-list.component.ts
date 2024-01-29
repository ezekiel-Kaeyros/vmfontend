import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseCategory } from 'src/app/models/course-category.model';
import { CourseCategoryService } from 'src/app/services/course-category.service';

@Component({
  selector: 'app-course-category-list',
  templateUrl: './course-category-list.component.html',
  styleUrls: ['./course-category-list.component.css']
})
export class CourseCategoryListComponent {
  showSpinner: boolean = true;

  courseCategories: CourseCategory[] = [];
  courseCategorySubscription$: Subscription;

  displayedColumns: string[] = ['position', 'name', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<CourseCategory>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
              private courseCategoryService: CourseCategoryService,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.courseCategoryService.getAllCategorys();
    
    this.courseCategorySubscription$ = this.courseCategoryService.courseCategorySubject$.subscribe(
      (response: CourseCategory[]) => {
        this.courseCategories = response;
        this.courseCategories = [...this.courseCategories.map(x => JSON.parse(JSON.stringify(x)))];
        this.courseCategories = this.courseCategories.map(courseCategory => {
          if (courseCategory.description) {
            let subDes = courseCategory.description.replace(/<(.+?)>/g, '');
            if (subDes.length > 40) {
              subDes = subDes.substring(0, 40);
              subDes = subDes.substring(0, subDes.lastIndexOf(' '));
              subDes += '...';
            }
            courseCategory.description = subDes;
          }
          return courseCategory;
        });
        this.showSpinner = false;
        this.dataSource = new MatTableDataSource(this.courseCategories);
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

  deleteCategory(courseCategory: CourseCategory) {
    this.courseCategoryService.deleteCourseCategory(courseCategory.id ?? 0).subscribe(
      (response) => {
        this.courseCategoryService.getAllCategorys();
        this.router.navigate(['/course-category/list']);
        console.log('Deleted successfully: ' + response);
      }
    );
  }

  ngOnDestroy(): void {
    this.courseCategorySubscription$.unsubscribe();
  }
}
