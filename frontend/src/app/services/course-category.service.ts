import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';
import { CourseCategory } from '../models/course-category.model';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  courseCategories: CourseCategory[] = [];
  courseCategorySubject$ = new Subject<CourseCategory[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) {}

  emitCourseCategorySubject() {
    this.courseCategorySubject$.next(this.courseCategories.slice());
  }

  getAllCategorys() {
    this.httpRequestConfig.getAll<CourseCategory>('/coursescategory').subscribe(
      (response: CourseCategory[]) => {
        console.log(response);
        this.courseCategories = (response as any).category;
        this.emitCourseCategorySubject();
      }
    );
  }

  getCourseCategory(id: number) {
    return this.httpRequestConfig.get<CourseCategory>('/coursescategory', id);
  }

  createCourseCategory(courseCategory: CourseCategory) {
    return this.httpRequestConfig.post<CourseCategory>('/coursescategory/add', courseCategory);
  }

  editCourseCategory(id: number|string, courseCategory: CourseCategory) {
    return this.httpRequestConfig.put<CourseCategory>('/coursescategory/update', id, courseCategory);
  }

  deleteCourseCategory(id: string|number) {
    return this.httpRequestConfig.delete<CourseCategory>('/coursescategory/delete', id);
  }

}
