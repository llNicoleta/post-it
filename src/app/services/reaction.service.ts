import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {AngularFirestore,} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private dbPath = '/reactions';

  userReactions = [];
  userId: string;
  emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid;
    })
  }

  getReactions(postId: string | undefined): Observable<unknown> {
    return this.afs.collection(this.dbPath).doc(postId).snapshotChanges().pipe(map((a) => {
      return a.payload.data();
    }));
  }

  addReaction(postId: string | undefined, reaction?: number | undefined) {
    const data = {[this.userId]: reaction};
    this.afs.collection(this.dbPath).doc(postId).set({...data}, {merge: true});
  }

  removeReaction(postId: string | undefined) {
    const data = {[this.userId]: null}
    this.afs.collection(this.dbPath).doc(postId).set({...data}, {merge: true});
  }

  countReactions(reactions: any) {
    return _.mapValues(_.groupBy(reactions), 'length');
  }

  userReaction(postId: string | undefined, reactions: any) {
    return _.get(reactions, [`${this.userId}`]);
  }
}
