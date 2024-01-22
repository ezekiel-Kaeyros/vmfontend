import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourceService } from 'src/app/services/cource.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course;

  constructor(private courseService: CourceService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.courseService.getCourse(id).subscribe(
      (response: Course) => {
        this.course = response;
        console.log(response)
      }
    );
  }

  deleteCourse(course: Course) {
    this.courseService.courses = this.courseService.courses.filter(x => x.id !== course.id);
    this.courseService.emitCourseSubject();
    this.router.navigate(['/courses']);
  }

}
