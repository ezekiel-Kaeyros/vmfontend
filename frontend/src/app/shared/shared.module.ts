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
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    SidenavComponent,
    FourOhFourComponent,
    MapComponent,
    ImpressumComponent,
    DatenschutzComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailsComponent
  ],
  entryComponents: [
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DialogComponent
  ]
})
export class SharedModule { }
