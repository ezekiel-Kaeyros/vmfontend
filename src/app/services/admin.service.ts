import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      // localStorage.setItem('username', username);
      // localStorage.setItem('password', password);
      this.router.navigate(['/projects/list']);
      return true;
    }
    return false;
  }

  isLoggedIn() {
    // const username = localStorage.getItem('username');
    // const password = localStorage.getItem('password');
  }
}
