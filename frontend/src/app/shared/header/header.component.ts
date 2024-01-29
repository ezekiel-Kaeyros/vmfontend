import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  inputValue: any;

  @Output() navToggle: EventEmitter<boolean> = new EventEmitter();

  dropdown: boolean = false;
  
  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    $(document).ready(() => {
    });
  }

  isAdmin() {
    return this.adminService.isLoggedIn()
  }

  logout() {
    this.adminService.logout();
  }

  navOpen() {
    this.navToggle.emit(true);
  }

  showMenu() {
    this.dropdown = !this.dropdown;
  }
  closeMenu() {
    this.dropdown = !this.dropdown;
  }
  openAbout(route: string) {
    this.router.navigateByUrl(route);
  }
}
