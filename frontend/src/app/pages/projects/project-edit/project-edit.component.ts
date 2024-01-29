import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
// To remove
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';
// End to remove

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent {
  @ViewChild('projektlogo') projektlogo: ElementRef;
  @ViewChild('kooperationspartner') kooperationspartner: ElementRef;
  @ViewChild('forderer') forderer: ElementRef;

  // To remove
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  // preview = '';
  logoProject = '';
  logoPatner = '';
  logoSponsor = '';

  imageInfos?: Observable<any>;
  // End to remove

  imageFiles: File[] = [];

  projectForm: FormGroup;
  project: Project;
  apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder,
              private projectService: ProjectService,
              private router: Router,
              private uploadService: UploadService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.projectService.getProject(id).subscribe(
      (response: Project) => {
        this.project = response;
        console.log(response);
        this.initForm(this.project);
      }
    );
  }

  initForm(project: Project) {
    this.projectForm = this.fb.group({
      title: [project.title, Validators.required],
      content: [project, Validators.required],
      category_id: [project.category_id],
      project_icon_url: [project.project_icon_url],
      project_image_url: [project.project_image_url],
      sponsor_images_urls: [project.sponsor_images_urls],
      director: [project.lead],
      code: [project.code],
    });
  }

  submitForm() {
    const formValue = this.projectForm.value;

    this.project.title = formValue['title'];
    this.project.content = formValue['content'];
    this.project.category_id = formValue['category_id'];
    this.project.project_icon_url = formValue['project_icon_url'];
    this.project.project_image_url = formValue['project_image_url'];
    this.project.sponsor_images_urls = formValue['sponsor_images_urls'];
    this.project.lead = formValue['director'];
    this.project.code = formValue['code'];
    this.projectService.editProject(this.project.id ?? 0, this.project).subscribe(
      (response) => {
        this.router.navigate([`/projects/${response.id}`]);
      },
      (error) => {
        console.error(`An error occured: ${error.message}`);
      }
    );
  }

  get contentControl() {
    return this.projectForm.controls['content'] as FormControl;
  }

  onSelectImage(event: any) {
    this.imageFiles.push(...event.addedFiles);
  }

  onRemoveImage(event: any) {
    this.imageFiles.splice(this.imageFiles.indexOf(event), 1);
  }

  uploadProjectLogoFile() {
    if (!this.imageFiles[0]) {
      alert("No files selected");
    } else {
      const data = new FormData();
      data.append('file', this.imageFiles[0]);
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

  uploadProjectImageFile() {
    if (!this.imageFiles[0]) {
      alert("No files selected");
    } else {
      const data = new FormData();
      data.append('file', this.imageFiles[0]);
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

  uploadSponsorImageFiles() {
    if (!this.imageFiles[0]) {
      alert("No files selected");
    } else {
      for (let file of this.imageFiles) {
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


  /*
  resetLogoProject() {
    this.logoProject = '';
    this.projektlogo.nativeElement.value = null;
    this.projectForm.get('photoUrl')?.reset();
    this.project.photoUrl = '';
  }

  resetLogoPatner() {
    this.logoPatner = '';
    this.kooperationspartner.nativeElement.value = null;
    this.projectForm.get('logoUrl')?.reset();
    this.project.logoUrl = '';
  }

  resetLogoSponsor() {
    this.logoSponsor = '';
    this.forderer.nativeElement.value = null;
    this.projectForm.get('sponsorLogoUrl')?.reset();
    this.project.sponsorLogoUrl = '';
  }

  selectLogoProject(event: any) {
    this.selectedFiles = event.target.files;
    this.logoProject = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.logoProject = '';
        this.currentFile = file;
        this.projectForm.get('photoUrl')?.patchValue(file);
        this.projectForm.get('photoUrl')?.updateValueAndValidity();

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.logoProject = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  selectLogoPatner(event: any) {
    this.selectedFiles = event.target.files;
    this.logoPatner = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.logoPatner = '';
        this.currentFile = file;
        this.projectForm.get('logoUrl')?.patchValue(file);
        this.projectForm.get('logoUrl')?.updateValueAndValidity();

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.logoPatner = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  selectLogoSponsor(event: any) {
    this.selectedFiles = event.target.files;
    this.logoSponsor = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        
        this.logoSponsor = '';
        this.currentFile = file;
        this.projectForm.get('sponsorLogoUrl')?.patchValue(file);
        this.projectForm.get('sponsorLogoUrl')?.updateValueAndValidity();
        console.log(this.projectForm.get('sponsorLogoUrl'));
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.logoSponsor = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  } */

}
