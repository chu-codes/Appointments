import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  useruid: string;
  constructor(
    public firebase: AngularFireDatabase,
    public datePipe: DatePipe,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) this.useruid = user.uid;
    });
  }

  appointmentList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    uid: new FormControl(''),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    room: new FormControl(0, Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl(0, Validators.required),
    appointmentName: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      uid: '',
      fullName: '',
      email: '',
      room: 0,
      date: '',
      time: 0,
      appointmentName: '',
    });
  }

  getAppointments() {
    this.appointmentList = this.firebase.list('appointments');
    return this.appointmentList.snapshotChanges();
  }

  insertAppointment(appointment) {
    this.appointmentList.push({
      uid: this.useruid,
      fullName: appointment.fullName,
      email: appointment.email,
      appointmentName: appointment.appointmentName,
      room: appointment.room,
      date:
        appointment.date == ''
          ? ''
          : this.datePipe.transform(appointment.date, 'yyyy-MM-dd'),
      time: appointment.time,
    });
  }

  updateAppointment(appointment) {
    this.appointmentList.update(appointment.$key, {
      fullName: appointment.fullName,
      email: appointment.email,
      appointmentName: appointment.appointmentName,
      room: appointment.room,
      date:
        appointment.date == ''
          ? ''
          : this.datePipe.transform(appointment.date, 'yyyy-MM-dd'),
      time: appointment.time,
    });
  }

  deleteAppointment($key: string) {
    this.appointmentList.remove($key);
  }

  populateForm(appointment) {
    this.form.setValue(_.omit(appointment));
  }
}
