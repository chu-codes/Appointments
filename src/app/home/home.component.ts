import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: firebase.User;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getUserState().subscribe((user) => {
      this.user = user;
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.auth.logOut();
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  onclickCreateAppointment() {
    this.router.navigate(['/appointments']);
  }
  needToLogIn() {
    console.log('hi');
  }
}
