import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  message: string;
  authError: any;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.eventAuthError$.subscribe((data) => {
      this.authError = data;
    });
  }

  createUser(frm) {
    if (frm.valid) {
      this.auth.createUser(frm.value);
    }
    if (frm.invalid) {
      this.message = 'All the fields are required';
    }
  }
}
