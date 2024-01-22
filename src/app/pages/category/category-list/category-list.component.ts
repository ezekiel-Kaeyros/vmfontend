import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  showSpinner: boolean = true;

  categories: Category[] = [];
  categorySubscription$: Subscription;

  displayedColumns: string[] = ['position', 'name', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
              private categoryService: CategoryService,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategorys();
    
    this.categorySubscription$ = this.categoryService.categorySubject$.subscribe(
      (response: Category[]) => {
        this.categories = response;
        this.categories = [...this.categories.map(x => JSON.parse(JSON.stringify(x)))];
        this.categories = this.categories.map(category => {
          if (category.description) {
            let subDes = category.description.replace(/<(.+?)>/g, '');
            if (subDes.length > 40) {
              subDes = subDes.substring(0, 40);
              subDes = subDes.substring(0, subDes.lastIndexOf(' '));
              subDes += '...';
            }
            category.description = subDes;
          }
          return category;
        });
        this.showSpinner = false;
        this.dataSource = new MatTableDataSource(this.categories);
        console.log("Category list", this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id ?? 0).subscribe(
      (response) => {
        this.categoryService.getAllCategorys();
        this.router.navigate(['/category/list']);
        console.log('Deleted successfully: ' + response);
      }
    );
  }

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }

}
