import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CourceService } from 'src/app/services/cource.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  breakpoint: number;
  gutter: string;

  showSpinner: boolean = true;

  courses: Course[] = [];
  courseSubscription$: Subscription;

  pagedList: Course[] = [];
  length: number = 0;
  pageSize: number = 6;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  categories: Category[] = [];
  categorySubscription$: Subscription;

  constructor(private courseService: CourceService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    console.log("INCOMPONENT");
    this.categoryService.getAllCategorys();
    this.categorySubscription$ = this.categoryService.categorySubject$.subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );

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
    this.courseService.getAllCourses();
    this.courseSubscription$ = this.courseService.courseSubject$.subscribe((response: Course[]) => {
        this.courses = [...response.map(x => JSON.parse(JSON.stringify(x)))];
        this.courses = this.courses.map(course => {
          let subDes = course.description.replace(/<(.+?)>/g, '');
          if (subDes.length > 110) {
            subDes = subDes.substring(0, 110);
            subDes = subDes.substring(0, subDes.lastIndexOf(' '));
            subDes += '...';
          }
          course.description = subDes;
          return course;
        });
        this.pagedList = this.courses.slice(0, 6);
        this.length = this.courses.length;
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
    this.pagedList = this.courses.slice(startIndex, endIndex);
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

  learnMore(course: Course) {
    window.location.href = course.link;
  }

  ngOnDestroy(): void {
    this.courseSubscription$.unsubscribe();
    this.categorySubscription$.unsubscribe();
  }

}
