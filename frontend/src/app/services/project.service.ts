import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable, Subject, of } from 'rxjs';
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
    this.emitProjectSubject();
    this.httpRequestConfig.getAll<Project>('/project').subscribe(
      (response) => {
        this.projects = (response as any).projects;
        this.emitProjectSubject();
      }
    );
  }

  getProject(project_id: number): Observable<Project> {
    // const project = this.projects.find(project => project.id === projectId);
    // if (!project) {
    //   throw new Error(`Project does not exist with id ${projectId}`);
    // } else {
    //   return of(project);
    // }
    return this.httpRequestConfig.get<Project>('/project', project_id);
  }

  createProject(project: Project): Observable<Project> {
    // this.projects.push(project);
    // this.emitProjectSubject();
    // return of(project);
    return this.httpRequestConfig.post<Project>('/project/add', project);
  }

  editProject(projectId: number, project: Project): Observable<Project> {
    // const currentProject = this.projects.find(project => project.id === projectId);
    // if (currentProject) {
    //   this.projects[projectId] = project;
    //   this.emitProjectSubject();
    //   return of(project);
    // } else {
    //   throw new Error(`Course does not exist with id ${projectId}`);
    // }
    return this.httpRequestConfig.put<Project>('/project/update', projectId, project);
  }

  deleteProject(projectId: number) {
    // const project = this.projects.find(project => project.id === projectId);
    // if (project) {
    //   this.projects = this.projects.filter(project => project.id !== projectId);
    //   this.emitProjectSubject();
    // } else {
    //   throw new Error(`Project does not exist with id ${projectId}`);
    // }
    return this.httpRequestConfig.delete<Project>('/project/delete', projectId);
  }
  
}
