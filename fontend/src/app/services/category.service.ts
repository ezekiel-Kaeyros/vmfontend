import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];
  categorySubject$ = new Subject<Category[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) {}

  emitCategorySubject() {
    this.categorySubject$.next(this.categories.slice());
  }

  getAllCategorys() {
    this.httpRequestConfig.getAll<Category>('/category').subscribe(
      (response: Category[]) => {
        console.log(response);
        this.categories = (response as any).category;
        this.emitCategorySubject();
      }
    );
  }

  getCategory(id: string) {
    return this.httpRequestConfig.get<Category>('/category', id);
  }

  createCategory(category: Category) {
    return this.httpRequestConfig.post<Category>('/category/add', category);
  }

  editCategory(id: number|string, category: Category) {
    return this.httpRequestConfig.put<Category>('/category/update', id, category);
  }

  deleteCategory(id: string|number) {
    return this.httpRequestConfig.delete<Category>('/category/delete', id);
  }

}
