import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';

@Component({
  selector: 'app-toolpages',
  templateUrl: './toolpages.component.html',
  styleUrls: ['./toolpages.component.css']
})
export class ToolpagesComponent {

  dataTool = {
    title: 'Translation tool',
    description: 'EDIE provides this tool to enable users to convert text to voice and vice versa, using their built-in tool.'
  };

  constructor(private router: Router,
              public additionalMethods: AdditionalMethodsService) { }

  ngOnInit(): void {
  }

}
