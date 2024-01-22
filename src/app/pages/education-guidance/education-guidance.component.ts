import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';

@Component({
  selector: 'app-education-guidance',
  templateUrl: './education-guidance.component.html',
  styleUrls: ['./education-guidance.component.css']
})
export class EducationGuidanceComponent {

  breakpoint: number;
  gutter: string;

  dataTool = {
    title: 'Translation tool',
    description: 'EDIE provides this tool to enable users to convert text to voice and vice versa, using their built-in tool.'
  };

  constructor(private router: Router,
              public additionalMethods: AdditionalMethodsService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 576) {
      this.breakpoint = 1;
      // this.gutter = '2px';
    } else if (window.innerWidth <= 992) {
      this.breakpoint = 2;
      // this.gutter = '5px';
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 3;
      // this.gutter = '8px';
    } else {
      this.breakpoint = 4;
      // this.gutter = '10px';
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 576) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 992) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

}
