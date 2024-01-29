import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Observable, Subject, of } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';
import { map } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourceService {

  courses: Course[] = [
    // {
    //   id: 0,
    //   title: 'What is Lorem Ipsum?',
    //   content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //   category_id: 2,
    //   course_fees: 243,
    //   start_date: new Date(),
    //   end_date: new Date(),
    //   start_time: '05:45',
    //   end_time: '20:56',
    //   director: 'Stone, John',
    //   user_id: 7,
    //   code: 'VMDO-045/24',
    //   created_at: new Date(),
    //   edited_at: new Date()
    // },
    // {
    //   id: 1,
    //   title: 'Why do we use it?',
    //   content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    //   category_id: 1,
    //   course_fees: 120,
    //   start_date: new Date(),
    //   end_date: new Date(),
    //   start_time: '08:45',
    //   end_time: '01:14',
    //   director: 'Stanbrige, Peter',
    //   user_id: 7,
    //   code: 'VMDO-221/24',
    //   created_at: new Date(),
    //   edited_at: new Date()
    // },
    // {
    //   id: 2,
    //   title: 'Where does it come from?',
    //   content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    //   category_id: 8,
    //   course_fees: 500,
    //   start_date: new Date(),
    //   end_date: new Date(),
    //   start_time: '09:40',
    //   end_time: '06:31',
    //   director: 'Li, Ang',
    //   user_id: 7,
    //   code: 'VMDO-30/24',
    //   created_at: new Date(),
    //   edited_at: new Date()
    // },
    // {
    //   id: 3,
    //   title: 'Where can I get some?',
    //   content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    //   category_id: 8,
    //   course_fees: 500,
    //   start_date: new Date(),
    //   end_date: new Date(),
    //   start_time: '05:25',
    //   end_time: '11:16',
    //   director: 'Harry, Daly',
    //   user_id: 7,
    //   code: 'VMDO-756/24',
    //   created_at: new Date(),
    //   edited_at: new Date()
    // }
  ];
  courseSubject$ = new Subject<Course[]>();

  apiUrl = environment.apiUrl;

  constructor(private httpRequestConfig: HttpRequestsConfigService) {}

  emitCourseSubject() {
    this.courseSubject$.next(this.courses.slice());
  }

  getAllCourses() {
    // this.emitCourseSubject();
    // const subject = new Subject();
    // subject.next("HY!!!");
    // subject.subscribe(x => console.log(x));
    // of(this.courses).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.emitCourseSubject();
    //   }
    // );
    this.httpRequestConfig.getAll<Course>('/courses').subscribe(
      (response: Course[]) => {
        this.courses = (response as any).courses;
        console.log(this.courses);
        this.emitCourseSubject();
      }
    );
  }

  getCourse(course_id: number) {
    // const course = this.courses.find(course => course.id === course_id);
    // console.log(course);
    // if (!course) {
    //   throw new Error(`Course does not exist with id ${course_id}`);
    // } else {
    //   return of(course);
    // }
    return this.httpRequestConfig.get<any>('/courses', course_id);
  }

  createCourse(course: Course): Observable<Course> {
    // this.courses.push(course);
    // this.emitCourseSubject();
    // console.log(this.courses.length);
    // return of(course);
    return this.httpRequestConfig.post<any>('/courses/add', course);
  }

  editCourse(course_id: number, course: Course): Observable<Course> {
    // const currentCourse = this.courses.find(course => course.id === course_id);
    // if (currentCourse) {
    //   this.courses[course_id] = course;
    //   this.emitCourseSubject();
    //   return of(course);
    // } else {
    //   throw new Error(`Course does not exist with id ${course_id}`);
    // }
    return this.httpRequestConfig.put<any>('/courses/update', course_id, {
      title: course.title,
      content: course.content,
      category_id: course.category_id,
      location: course.location,
      cource_fees: course.course_fees,
      start_date: course.start_date,
      end_date: course.end_date,
      start_time: course.start_time,
      end_time: course.end_time
    });
  }

  deleteCourse(course_id: number) {
    // const currentCourse = this.courses.find(course => course.id === course_id);
    // if (currentCourse) {
    //   this.courses = this.courses.filter(course => course.id !== course_id);
    //   this.emitCourseSubject();
    // } else {
    //   throw new Error(`Course does not exist with id ${course_id}`);
    // }
    return this.httpRequestConfig.delete<any>('/courses/delete', course_id);
  }
  
}
