import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent, MapComponent } from './footer/footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../modules/material/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    SidenavComponent,
    FourOhFourComponent,
    MapComponent,
    ImpressumComponent,
    DatenschutzComponent
  ],
  entryComponents: [
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DialogComponent
  ]
})
export class SharedModule { }
