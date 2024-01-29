import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { AdminService } from 'src/app/services/admin.service';
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
              private router: Router,
              private adminService: AdminService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.courseService.getCourse(id).subscribe(
      (response: Course) => {
        this.course = response;
        console.log(response)
      }
    );
  }

  isAdmin() {
    return this.adminService.isLoggedIn()
  }

  editCourse() {
    this.router.navigateByUrl(`/courses/${this.course.id}/edit`);
  }

  deleteCourse(course: Course) {
    this.courseService.courses = this.courseService.courses.filter(x => x.id !== course.id);
    this.courseService.emitCourseSubject();
    this.router.navigate(['/courses']);
  }

  inscription(course_id: number) {
    this.router.navigateByUrl(`/inscription/${course_id}`);
  }

}
