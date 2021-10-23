import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {CommentModel} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  dbPath = '/comments';
  commentsReference: AngularFirestoreCollection<CommentModel>;

  constructor(private afs: AngularFirestore) {
  }

  getComments(postId?: string) {
    return this.afs.collection(this.dbPath, ref => ref.orderBy('timestamp', 'desc').where('postId', '==', `${postId}`));
  }

  addComment(comment: CommentModel) {
    return this.afs.collection(this.dbPath).add({...comment});
  }

  deleteComment(commentId?: string) {
    this.afs.collection(this.dbPath).doc(commentId).delete();
  }
}
