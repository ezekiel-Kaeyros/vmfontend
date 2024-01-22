import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToolboxComponent } from './pages/toolbox/toolbox.component';
import { ToolpagesComponent } from './pages/toolpages/toolpages.component';
import { TextComponent } from './pages/toolbox/text/text.component';
import { AudioComponent } from './pages/toolbox/audio/audio.component';
import { ImageComponent } from './pages/toolbox/image/image.component';
import { DocumentComponent } from './pages/toolbox/document/document.component';
import { ScanComponent } from './pages/toolbox/scan/scan.component';
import { ImgSelectComponent } from './pages/toolbox/image/img-select/img-select.component';
import { ImgContentComponent } from './pages/toolbox/image/img-content/img-content.component';
import { DocSelectComponent } from './pages/toolbox/document/doc-select/doc-select.component';
import { DocContentComponent } from './pages/toolbox/document/doc-content/doc-content.component';
import { ProgramComponent } from './pages/program/program.component';
import { EducationGuidanceComponent } from './pages/education-guidance/education-guidance.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ToolMethodenkofferComponent } from './pages/tool-methodenkoffer/tool-methodenkoffer.component';
import { ProjectListComponent } from './pages/projects/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';
import { ProjectEditComponent } from './pages/projects/project-edit/project-edit.component';
import { CourseListComponent } from './pages/program/course/course-list/course-list.component';
import { CourseCreateComponent } from './pages/program/course/course-create/course-create.component';
import { CourseDetailsComponent } from './pages/program/course/course-details/course-details.component';
import { CourseEditComponent } from './pages/program/course/course-edit/course-edit.component';
import { FourOhFourComponent } from './shared/four-oh-four/four-oh-four.component';
import { PdfReaderComponent } from './pages/program/pdf-reader/pdf-reader.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ImpressumComponent } from './shared/impressum/impressum.component';
import { DatenschutzComponent } from './shared/datenschutz/datenschutz.component';
import { MarkdownComponent } from './pages/markdown/markdown.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { CategoryDetailsComponent } from './pages/category/category-details/category-details.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'program', component: ProgramComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/create', component: CourseCreateComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'courses/:id/edit', component: CourseEditComponent },
  { path: 'program-pdf', component: PdfReaderComponent },
  { path: 'education', component: EducationGuidanceComponent},
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/list', component: ProjectListComponent },
  { path: 'projects/create', component: ProjectCreateComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'projects/:id/edit', component: ProjectEditComponent },
  { path: 'markdown', component: MarkdownComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/list', component: CategoryListComponent },
  { path: 'category/create', component: CategoryCreateComponent },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: 'category/:id/edit', component: CategoryEditComponent },
  {
    path: 'toolbox',
    component: ToolboxComponent,
    children: [
      { path: 'text', component: TextComponent },
      { path: 'audio', component: AudioComponent },
      { 
        path: 'image',
        component: ImageComponent,
        children: [
          { path: 'img-select', component: ImgSelectComponent },
          { path: 'img-content', component: ImgContentComponent },
          { path: '', redirectTo: 'img-select', pathMatch: 'full' }
        ]
      },
      {
        path: 'document',
        component: DocumentComponent,
        children: [
          { path: 'doc-select', component: DocSelectComponent },
          { path: 'doc-content', component: DocContentComponent },
          { path: '', redirectTo: 'doc-select', pathMatch: 'full' }
        ]
      },
      { path: 'scan', component: ScanComponent },
      { path: '', redirectTo: 'audio', pathMatch: 'full' }
    ]
  },
  { path: 'methodenkoffer', component: ToolMethodenkofferComponent },
  { path: 'toolbox-pages', component: ToolpagesComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'vmdo_admin', component: AdminComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:"reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
