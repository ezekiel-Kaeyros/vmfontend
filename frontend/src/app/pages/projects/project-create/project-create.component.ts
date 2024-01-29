import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
// To remove
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { UploadService } from 'src/app/services/upload.service';
// End to remove

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {

  logoFile: File[] = [];
  imageProject: File[] = [];
  sponsorImages: File[] = [];

  projectForm: FormGroup;
  projectPreview$: Observable<Project>;

  constructor(private fb: FormBuilder,
              private projectService: ProjectService,
              private uploadService: UploadService,
              private router: Router) {}

  ngOnInit(): void {
    this.initForm();

    this.projectPreview$ = this.projectForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue
      }))
    );
  }

  initForm() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category_id: [null],
      project_icon_url: [null],
      project_image_url: [null],
      sponsor_images_urls: [null],
      director: [null],
      code: [null]
    });
  }

  submitForm() {
    const formValue = this.projectForm.value;

    const project: Project = {
      title: formValue['title'],
      content: formValue['content'],
      category_id: formValue['category_id'],
      project_icon_url: formValue['project_icon_url'],
      project_image_url: formValue['project_image_url'],
      sponsor_images_urls: formValue['sponsor_images_urls'],
      lead: formValue['director'],
      code: formValue['code']
    };
    console.log(project);
    this.projectService.createProject(project).subscribe(
      (response) => {
        this.projectService.getAllProjects();
        this.projectService.emitProjectSubject();
        this.router.navigate([`/projects/${response.id}`]);
      },
      (error: HttpErrorResponse) => {
        console.error(`An error occured: ${error.message}`);
      }
    );
  }

  get contentControl() {
    return this.projectForm.controls['content'] as FormControl;
  }
  
  // UPLOAD LOGO PROJECT
  onSelectLogo(event: any) {
    this.logoFile.push(...event.addedFiles);
  }

  onRemoveLogo(event: any) {
    this.logoFile.splice(this.logoFile.indexOf(event), 1);
  }

  uploadProjectLogoFile() {
    if (!this.logoFile[0]) {
      alert("No files selected");
    } else {
      const data = new FormData();
      data.append('file', this.logoFile[0]);
      data.append('upload_preset', 'vmdo-project');
      data.append('cloud_name', 'kaeyros-cloudinary');
      this.uploadService.uploadImage(data).subscribe(
        (response) => {
          console.log(response);
          this.projectForm.get('project_icon_url')?.patchValue(response.secure_url);
          this.projectForm.get('project_icon_url')?.updateValueAndValidity();
        }
      );
    }
  }

  // UPLOAD IMAGE PROJECT
  onSelectImageProject(event: any) {
    this.imageProject.push(...event.addedFiles);
  }

  onRemoveImageProject(event: any) {
    this.imageProject.splice(this.imageProject.indexOf(event), 1);
  }

  uploadProjectImageFile() {
    if (!this.imageProject[0]) {
      alert("No files selected");
    } else {
      const data = new FormData();
      data.append('file', this.imageProject[0]);
      data.append('upload_preset', 'vmdo-project');
      data.append('cloud_name', 'kaeyros-cloudinary');
      this.uploadService.uploadImage(data).subscribe(
        (response) => {
          console.log(response);
          this.projectForm.get('project_image_url')?.patchValue(response.secure_url);
          this.projectForm.get('project_image_url')?.updateValueAndValidity();
        }
      );
    }
  }

  // UPLOAD SPONSOR IMAGE PROJECT
  onSelectSponsorImage(event: any) {
    this.sponsorImages.push(...event.addedFiles);
  }

  onRemoveSponsorImage(event: any) {
    this.sponsorImages.splice(this.sponsorImages.indexOf(event), 1);
  }

  uploadSponsorImageFiles() {
    if (!this.sponsorImages[0]) {
      alert("No files selected");
    } else {
      for (let file of this.sponsorImages) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'vmdo-project');
        data.append('cloud_name', 'kaeyros-cloudinary');
        this.uploadService.uploadImage(data).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    }
  }

}
