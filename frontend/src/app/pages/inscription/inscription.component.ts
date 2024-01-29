import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Inscription } from 'src/app/models/inscription.model';
import { CourceService } from 'src/app/services/cource.service';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
  inscriptionForm: FormGroup;
  course: Course;

  constructor(private fb: FormBuilder,
    private courseService: CourceService,
    private inscriptionService: InscriptionService,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.courseService.getCourse(id).subscribe(
      (response: Course) => {
        this.course = response;
      }
    );
    this.initForm();
  }

  initForm() {
    this.inscriptionForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      first_name: [''],
      last_name: [''],
      message: ['']
    });
  }

  submitForm() {
    const formValue = this.inscriptionForm.value;
    const inscription: Inscription = {
      email: formValue['email'],
      first_name: formValue['first_name'],
      last_name: formValue['last_name'],
      message: formValue['message'],
      course_code: this.course.code,
      course_title: this.course.title,
      course_id: this.course.id
    }
    console.log(inscription);
    this.inscriptionService.createInscription(inscription).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/program');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }
}
