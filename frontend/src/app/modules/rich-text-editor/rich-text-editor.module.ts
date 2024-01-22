import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from './rich-text-editor.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  declarations: [RichTextEditorComponent],
  exports: [RichTextEditorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RichTextEditorModule { }
