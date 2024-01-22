import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {

  categoryForm: FormGroup;
  category: Category;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.categoryService.getCategory(id).subscribe(
      (response: Category) => {
        this.category = response;
        this.initForm(this.category);
      }
    );
  }

  initForm(category: Category) {
    this.categoryForm = this.fb.group({
      name: [category.name, Validators.required],
      description: [category.description]
    });
  }

  submitForm() {
    const formValue = this.categoryForm.value;
    this.category.name = formValue['name'];
    this.category.description = formValue['description'];
    console.log(this.category);
    this.categoryService.editCategory(this.category.id ?? 0, this.category).subscribe(
      (response: Category) => {
        this.router.navigate([`/category/${response.id}`])
      },
      (error) => {
        console.error(`An error occured: ${error.message}`);
      }
    );
  }

}
