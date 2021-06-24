import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  authError: any;

  constructor(
    private auth: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.auth.eventAuthError$.subscribe((data) => {
      this.authError = data;
    });
  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
    this.isLoggedIn = true;
    frm.value.email == 'chuki@email.com'
      ? localStorage.setItem('role', 'admin')
      : localStorage.setItem('role', 'network user');
  }
}
