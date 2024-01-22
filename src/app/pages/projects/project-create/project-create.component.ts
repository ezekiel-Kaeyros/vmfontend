import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
// To remove
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// End to remove

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {
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

  projectForm: FormGroup;

  constructor(private fb: FormBuilder,
              private projectService: ProjectService,
              private router: Router) {}

  ngOnInit(): void {
      this.initForm();
  }

  initForm() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: [null],
      logoUrl: [null],
      sponsorLogoUrl: [null]
    });
  }

  submitForm() {
    const formValue = this.projectForm.value;

    const projectData = new FormData();
    projectData.append('title', formValue['title']);
    projectData.append('duration', formValue['duration']);
    projectData.append('description', formValue['description']);
    projectData.append('link', '__link');
    projectData.append('author', '__author');
    projectData.append('photoUrl', formValue['photoUrl']);
    projectData.append('logoUrl', formValue['logoUrl']);
    projectData.append('sponsorLogoUrl', formValue['sponsorLogoUrl']);
    this.projectService.createProject(projectData as any).subscribe(
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

  get descriptionControl() {
    return this.projectForm.controls['description'] as FormControl;
  }

  resetLogoProject() {
    this.logoProject = '';
    this.projektlogo.nativeElement.value = null;
    this.projectForm.get('photoUrl')?.reset();}

  resetLogoPatner() {
    this.logoPatner = '';
    this.kooperationspartner.nativeElement.value = null;
    this.projectForm.get('logoUrl')?.reset();
  }

  resetLogoSponsor() {
    this.logoSponsor = '';
    this.forderer.nativeElement.value = null;
    this.projectForm.get('sponsorLogoUrl')?.reset();
  }

  selectFile(event: any): void {
    let preview = '';
    this.message = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
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

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.logoSponsor = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

}
