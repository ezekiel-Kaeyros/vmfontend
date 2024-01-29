import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private adminService: AdminService,
    private router: Router) {}

  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.adminService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/vmdo_admin'], {queryParams: {'redirectURL': state.url}});
      return false;
    }
  }
  
}
