import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdditionalMethodsService {

  dialogRef: MatDialogRef<DialogComponent>;

  imageFile: File;
  imageFileSubject$ = new Subject<File>();
  documentFile: File;
  documentFileSubject$ = new Subject<File>();


  constructor(public dialog: MatDialog,
              private ruoter: Router) { }

  emitImageFileSubject() {
    this.imageFileSubject$.next(this.imageFile);
  }
  emitDocumentFileSubject() {
    this.documentFileSubject$.next(this.documentFile);
  }

  getImageFile(imageFile: File): Observable<File> {
    this.imageFile = imageFile;
    return of(this.imageFile);
  }
  getDocumentFile(documentFile: File): Observable<File> {
    this.documentFile = documentFile;
    return of(this.imageFile);
  }

  openDialog(data: {title: string, description: string}) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {data: data},
      disableClose: false
    });
    this.dialogRef.componentInstance.textContent = data;

    this.dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.ruoter.navigate(['toolbox']);
      }
      this.dialogRef = {} as MatDialogRef<DialogComponent>;
    });
  }
}
