import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];
  projectSubject$ = new Subject<Project[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) { }

  emitProjectSubject() {
    this.projectSubject$.next(this.projects as Array<Project>);
  }

  getAllProjects() {
    this.httpRequestConfig.getAll<Project>('/project').subscribe(
      (response) => {
        this.projects = (response as any).projects;
        this.emitProjectSubject();
      }
    );
  }

  getProject(id: string) {
    return this.httpRequestConfig.get<Project>('/project', id);
  }

  createProject(project: Project) {
    return this.httpRequestConfig.post<Project>('/project/add', project);
  }

  editProject(id: number|string, project: Project) {
    return this.httpRequestConfig.put<Project>('/project/update', id, project);
  }

  deleteProject(id: string|number) {
    return this.httpRequestConfig.delete<Project>('/project/delete', id);
  }
  
}
