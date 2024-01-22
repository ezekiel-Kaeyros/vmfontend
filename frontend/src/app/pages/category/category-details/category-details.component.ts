import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category: Category;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.categoryService.getCategory(id).subscribe(
      (response: Category) => {
        console.log(response)
        this.category = response;
      }
    );
  }

  deleteCourse(category: Category) {
    this.categoryService.categories = this.categoryService.categories.filter(x => x.id !== category.id);
    this.categoryService.emitCategorySubject();
    this.router.navigate(['/category/list']);
  }

}
