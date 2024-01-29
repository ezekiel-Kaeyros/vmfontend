import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      this.router.navigate(['/courses']);
      return true;
    }
    return false;
  }

  isLoggedIn() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    return !(username === null || password === null);
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.router.navigate(['/']);
  }
}
