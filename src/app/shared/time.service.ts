import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  timeList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.timeList = this.firebase.list('Time');
    this.timeList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }
}
