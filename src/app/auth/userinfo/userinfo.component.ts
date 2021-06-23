import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';
import { Item } from '../users';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {
  items: Item[];

  usersList: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'email', 'role', 'authorized'];
  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.service.getItems().subscribe((items) => {
      console.log(items);
      this.items = items;
      this.usersList = new MatTableDataSource(items);
    });
  }
}
