import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {
  markdownForm: FormGroup;
  richTextForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.markdownForm = this._fb.group({
      title: ["Hello, I am Trung", Validators.required],
      description: [
        "This is a markdown text editor for - http://jira.trungk18.com/"
      ]
    });

    this.richTextForm = this._fb.group({
      title: ["Hello, I am Trung", Validators.required],
      description: [
        `<h2><u>This is </u>a <span style=\"color: rgb(240, 102, 102);\">RICH</span> <strong>text editor</strong> <em>for</em> - <a href=\"http://jira.trungk18.com/\" rel=\"noopener noreferrer\" target=\"_blank\">http://jira.trungk18.com/</a></h2><h3><span style=\"color: rgb(153, 51, 255);\">I hope you </span><strong style=\"color: rgb(153, 51, 255);\">like it!</strong></h3>`
      ]
    });
  }

  get descriptionRawControl() {
    return this.markdownForm.controls['description'] as FormControl;
  }

  get descriptionRichControl() {
    return this.richTextForm.controls['description'] as FormControl;
  }
}
