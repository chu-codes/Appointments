import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  useruid: string;
  constructor(
    public service: AppointmentService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) this.useruid = user.uid;
    });
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'appointmentName',
    'room',
    'date',
    'time',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getAppointments().subscribe((list) => {
      let array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateAppointment() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AppointmentComponent, dialogConfig);
  }

  onEditAppointmet(row) {
    if (row['uid'] === this.useruid) {
      this.service.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(AppointmentComponent, dialogConfig);
    } else {
      console.log('You cannot edit');
      console.log(this.useruid);
      console.log(row['uid']);
    }
  }

  onDeleteAppointment($key) {
    if (confirm('Are you sure to remove this appointment?')) {
      this.service.deleteAppointment($key);
      this.notificationService.warn('Deleted succesfully');
    }
  }
}
