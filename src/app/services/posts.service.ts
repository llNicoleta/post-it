import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {PostModel} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private dbPath = '/posts';
  postsReference: AngularFirestoreCollection<PostModel>;

  constructor(private afs: AngularFirestore) {
    this.postsReference = this.afs.collection(this.dbPath, ref => ref.orderBy('timestamp', "desc"));
  }

  getPosts(): AngularFirestoreCollection<PostModel> {
    return this.postsReference;
  }

  create(post: PostModel) {
    return this.postsReference.add({...post});
  }

  delete(postId: string | undefined) {
    return this.postsReference.doc(postId).delete();
  }

  getUserPosts(userId: string | null) {
    return this.afs.collection(this.dbPath, ref => ref.orderBy('timestamp', 'desc').where('userId', '==', `${userId}`));
  }
}
