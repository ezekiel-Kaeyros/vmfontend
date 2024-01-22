import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { RouterModule } from '@angular/router';
import { ToolpagesComponent } from './toolpages/toolpages.component';
import { MaterialModule } from '../modules/material/material.module';
import { TextComponent } from './toolbox/text/text.component';
import { AudioComponent } from './toolbox/audio/audio.component';
import { ImageComponent } from './toolbox/image/image.component';
import { DocumentComponent } from './toolbox/document/document.component';
import { ScanComponent } from './toolbox/scan/scan.component';
import { ImgSelectComponent } from './toolbox/image/img-select/img-select.component';
import { ImgContentComponent } from './toolbox/image/img-content/img-content.component';
import { DocSelectComponent } from './toolbox/document/doc-select/doc-select.component';
import { DocContentComponent } from './toolbox/document/doc-content/doc-content.component';
import { ProgramComponent } from './program/program.component';
import { LearningPlatformComponent } from './learning-platform/learning-platform.component';
import { EducationGuidanceComponent } from './education-guidance/education-guidance.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolMethodenkofferComponent } from './tool-methodenkoffer/tool-methodenkoffer.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { CourseListComponent } from './program/course/course-list/course-list.component';
import { CourseCreateComponent } from './program/course/course-create/course-create.component';
import { CourseEditComponent } from './program/course/course-edit/course-edit.component';
import { CourseDetailsComponent } from './program/course/course-details/course-details.component';
import { PdfReaderComponent } from './program/pdf-reader/pdf-reader.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MarkdownComponent } from './markdown/markdown.component';

import { MarkdownEditorModule } from '../modules/markdown-editor/markdown-editor.module';
import { RichTextEditorModule } from '../modules/rich-text-editor/rich-text-editor.module';
import { QuillModule } from 'ngx-quill';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    ToolboxComponent,
    ToolpagesComponent,
    TextComponent,
    AudioComponent,
    ImageComponent,
    DocumentComponent,
    ScanComponent,
    ImgSelectComponent,
    ImgContentComponent,
    DocSelectComponent,
    DocContentComponent,
    ProgramComponent,
    LearningPlatformComponent,
    EducationGuidanceComponent,
    ProjectsComponent,
    AboutUsComponent,
    ToolMethodenkofferComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectDetailsComponent,
    CourseListComponent,
    CourseCreateComponent,
    CourseEditComponent,
    CourseDetailsComponent,
    PdfReaderComponent,
    AdminComponent,
    MarkdownComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryDetailsComponent,
    CategoryEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    MarkdownEditorModule,
    RichTextEditorModule,
    QuillModule.forRoot()
  ]
})
export class PagesModule { }
