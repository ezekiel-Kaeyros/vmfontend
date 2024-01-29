import { Injectable } from '@angular/core';
import { ProjectCategory } from '../models/project-category.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {

  projectCategories: ProjectCategory[] = [];
  projectCategorySubject$ = new Subject<ProjectCategory[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) {}

  emitProjectCategorySubject() {
    this.projectCategorySubject$.next(this.projectCategories.slice());
  }

  getAllCategorys() {
    this.httpRequestConfig.getAll<ProjectCategory>('/projectcategory').subscribe(
      (response: ProjectCategory[]) => {
        console.log(response);
        this.projectCategories = (response as any).category;
        this.emitProjectCategorySubject();
      }
    );
  }

  getProjectCategory(id: number) {
    return this.httpRequestConfig.get<ProjectCategory>('/projectscategory', id);
  }

  createProjectCategory(category: ProjectCategory) {
    return this.httpRequestConfig.post<ProjectCategory>('/projectscategory/add', category);
  }

  editProjectCategory(id: number|string, category: ProjectCategory) {
    return this.httpRequestConfig.put<ProjectCategory>('/projectscategory/update', id, category);
  }

  deleteProjectCategory(id: string|number) {
    return this.httpRequestConfig.delete<ProjectCategory>('/projectscategory/delete', id);
  }
}
