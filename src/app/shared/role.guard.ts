import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}
  canActivate() {
    let Role = localStorage.getItem('role');
    if (this.authService.loggedIn()) {
      if (Role == 'admin') {
        return true;
      } else {
        // alert('You dont have admin access');
        this.router.navigate(['/home']);
        this.notificationService.warn('You dont have admin access');
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      this.notificationService.warn('Please login to access Admin Dashboard');
      return false;
    }
  }
}
