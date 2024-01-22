import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  submitForm() {
    const formValue = this.categoryForm.value;
    const category: Category = {
      name: formValue['name'],
      description: formValue['description']
    };
    console.log(category);
    this.categoryService.createCategory(category).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([`/category/${response.id}`]);
      },
      (error) => {
        console.log(error);
        console.error('An occured: ' + error);
      }
    );
  }

}
