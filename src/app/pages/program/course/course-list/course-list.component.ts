import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CourceService } from 'src/app/services/cource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  showSpinner: boolean = true;

  courses: Course[] = [];
  courseSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'title', 'description', 'start_date', 'end_date', 'course_fees', 'link', 'author', 'createdAt', 'edit', 'delete'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private courseService: CourceService,
              private router: Router) {}

  ngOnInit(): void {
    this.courseService.getAllCourses();
    this.courseSubscription$ = this.courseService.courseSubject$.subscribe(
      (response: Course[]) => {
        this.courses = response;
        this.courses = [...this.courses.map(x => JSON.parse(JSON.stringify(x)))];
        this.courses = this.courses.map(course => {
          let subDes = course.description.replace(/<(.+?)>/g, '');
          if (subDes.length > 40) {
            subDes = subDes.substring(0, 40);
            subDes = subDes.substring(0, subDes.lastIndexOf(' '));
            subDes += '...';
          }
          course.description = subDes;
          return course;
        });
        this.showSpinner = false;
    
        this.dataSource = new MatTableDataSource(this.courses);
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

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id ?? 0).subscribe(
      (response) => {
        this.courseService.getAllCourses();
        this.router.navigate(['/courses']);
        console.log('Deleted successfully: ' + response);
      }
    );
  }

  ngOnDestroy(): void {
    this.courseSubscription$.unsubscribe();
  }

}
