import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.roomList = this.firebase.list('rooms');
    this.roomList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }
}
