import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    $(document).ready(() => {
    });
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
