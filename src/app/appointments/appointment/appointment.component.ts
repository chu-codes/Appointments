import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomService } from 'src/app/shared/room.service';
import { TimeService } from 'src/app/shared/time.service';

import { AppointmentService } from '../../shared/appointment.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  constructor(
    public service: AppointmentService,
    public roomService: RoomService,
    public timeService: TimeService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<AppointmentComponent>
  ) {}

  // rooms = [
  //   { id: 1, value: 'Room A' },
  //   { id: 2, value: 'Room B' },
  //   { id: 3, value: 'Room C' },
  // ];

  // Time = [
  //   { id: 1, value: '09:00 AM to 10:00 AM' },
  //   { id: 2, value: '10:00 AM to 11:00 AM' },
  //   { id: 3, value: '11:00 AM to 12:00' },
  //   { id: 4, value: '12:00 to 01:00 PM' },
  //   { id: 5, value: '02:00 PM to 03:00 PM' },
  //   { id: 6, value: '03:00 PM to 04:00 PM' },
  //   { id: 7, value: '04:00 PM to 05:00 PM' },
  // ];

  ngOnInit() {
    this.service.getAppointments();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertAppointment(this.service.form.value);
      else this.service.updateAppointment(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully');
      this.onClosePopup();
    }
  }

  onClosePopup() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
