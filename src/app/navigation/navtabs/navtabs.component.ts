import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import firebase from 'firebase/app';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.css'],
})
export class NavtabsComponent {
  user: firebase.User;
  activelink = '';
  links = [
    { path: '', label: 'Home' },
    { path: 'appointments', label: 'Appointments' },
    { path: 'admin', label: 'Admin' },
  ];
  constructor(
    private auth: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.auth.getUserState().subscribe((user) => {
      this.user = user;
    });
  }

  logOut() {
    this.auth.logOut();
    this.notificationService.success('Logged Out');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
