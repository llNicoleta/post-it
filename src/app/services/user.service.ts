import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserModel} from "../models/user.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  dbPath = '/users';

  constructor(private afs: AngularFirestore) { }

    getUser(userId: string | undefined) {
    return this.afs.collection<UserModel>(this.dbPath).doc(userId).snapshotChanges().pipe(map(a => {
      return a.payload.data() as UserModel;
    }))
  }

  makeModerator(userId: string | null) {
    this.afs.collection<UserModel>(this.dbPath).doc(userId!).update({isModerator: true});
  }
}
