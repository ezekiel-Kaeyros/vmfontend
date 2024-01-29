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
import { LoginComponent } from './shared/user/login/login.component';
import { SignupComponent } from './shared/user/signup/signup.component';
import { UserListComponent } from './shared/user/user-list/user-list.component';
import { UserDetailsComponent } from './shared/user/user-details/user-details.component';
import { UserEditComponent } from './shared/user/user-edit/user-edit.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { CourseCategoryListComponent } from './pages/course-category/course-category-list/course-category-list.component';
import { CourseCategoryCreateComponent } from './pages/course-category/course-category-create/course-category-create.component';
import { CourseCategoryEditComponent } from './pages/course-category/course-category-edit/course-category-edit.component';
import { ProjectCategoryListComponent } from './pages/project-category/project-category-list/project-category-list.component';
import { ProjectCategoryCreateComponent } from './pages/project-category/project-category-create/project-category-create.component';
import { ProjectCategoryEditComponent } from './pages/project-category/project-category-edit/project-category-edit.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CourseCategoryDetailsComponent } from './pages/course-category/course-category-details/course-category-details.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/:username', component: UserDetailsComponent},
  {path: 'users/:username/edit', component: UserEditComponent},
  { path: 'program', component: ProgramComponent },
  { path: 'courses', canActivate: [AuthGuard], component: CourseListComponent },
  { path: 'courses/create', canActivate: [AuthGuard], component: CourseCreateComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'courses/:id/edit', canActivate: [AuthGuard], component: CourseEditComponent },
  { path: 'program-pdf', component: PdfReaderComponent },
  { path: 'education', component: EducationGuidanceComponent},
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/list', canActivate: [AuthGuard], component: ProjectListComponent },
  { path: 'projects/create', canActivate: [AuthGuard], component: ProjectCreateComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'projects/:id/edit', canActivate: [AuthGuard], component: ProjectEditComponent },
  { path: 'markdown', component: MarkdownComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'course-category/list', component: CourseCategoryListComponent },
  { path: 'course-category/create', component: CourseCategoryCreateComponent },
  { path: 'course-category/:id', component: CourseCategoryDetailsComponent },
  { path: 'course-category/:id/edit', component: CourseCategoryEditComponent },
  { path: 'project-category/list', component: ProjectCategoryListComponent },
  { path: 'project-category/create', component: ProjectCategoryCreateComponent },
  { path: 'project-category/:id/edit', component: ProjectCategoryEditComponent },
  { path: 'inscription/:id', component: InscriptionComponent },
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
