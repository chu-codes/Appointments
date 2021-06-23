import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Item } from './users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;
  isLoggedIn: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.items = this.db.collection('Users').valueChanges();
  }

  getItems() {
    return this.items;
  }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.eventAuthError.next(error);
      })
      .then((userCredential) => {
        if (userCredential) {
          this.router.navigate(['/home']);
        } else {
        }
      });
    localStorage.setItem('token', 'true');
  }

  createUser(user) {
    this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        });

        this.insertUserData(userCredential).then(() => {
          this.router.navigate(['/login']);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user',
      authorized: true,
    });
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.clear();
    return this.afAuth.signOut();
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
