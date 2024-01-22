import { Component } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-reader',
  templateUrl: './pdf-reader.component.html',
  styleUrls: ['./pdf-reader.component.css']
})
export class PdfReaderComponent {

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
