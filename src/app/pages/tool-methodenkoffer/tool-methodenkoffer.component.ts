import { Component } from '@angular/core';
import { GcPdfViewer } from '@grapecity/gcpdfviewer';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-tool-methodenkoffer',
  templateUrl: './tool-methodenkoffer.component.html',
  styleUrls: ['./tool-methodenkoffer.component.css']
})
export class ToolMethodenkofferComponent {

  pdfSource: string = "assets/pdf/2023_Programm.pdf";
  totalPages!: number;
  page: number = 1;
  isLoaded: boolean = false;

  callBackFn(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

}
