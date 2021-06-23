import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.css'],
})
export class NavtabsComponent {
  activelink = '';
  links = [
    { path: '', label: 'Home' },
    { path: 'appointments', label: 'Appointments' },
    { path: 'admin', label: 'Admin' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
