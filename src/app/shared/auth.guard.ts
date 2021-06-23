import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notificationService.warn('Please login to access Appointments');
      return false;
    }
  }
}
