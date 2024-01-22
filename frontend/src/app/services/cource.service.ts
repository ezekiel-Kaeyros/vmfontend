import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class CourceService {

  courses: Course[] = [];
  courseSubject$ = new Subject<Course[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) {}

  emitCourseSubject() {
    this.courseSubject$.next(this.courses.slice());
  }

  getAllCourses() {
    console.log("KURSE");
    this.httpRequestConfig.getAll<Course>('/courses').subscribe(
      (response: Course[]) => {
        console.log(response);
        this.courses = (response as any).courses;
        this.emitCourseSubject();
      }
    );
  }

  getCourse(id: string) {
    return this.httpRequestConfig.get<Course>('/courses', id);
  }

  createCourse(course: Course) {
    return this.httpRequestConfig.post<Course>('/courses/add', course);
  }

  editCourse(id: number|string, course: Course) {
    return this.httpRequestConfig.put<Course>('/courses/update', id, course);
  }

  deleteCourse(id: string|number) {
    return this.httpRequestConfig.delete<Course>('/courses/delete', id);
  }
  
}
