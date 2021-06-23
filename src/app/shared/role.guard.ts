import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    let Role = localStorage.getItem('role');
    if (Role == 'admin') {
      return true;
    }
    alert('You dont have admin access');
    this.router.navigate(['/home']);
    return false;
  }
}
