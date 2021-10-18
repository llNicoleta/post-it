import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {PostModel} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private dbPath = '/posts';
  postsReference: AngularFirestoreCollection<PostModel>;

  constructor(private firestore: AngularFirestore) {
    this.postsReference = firestore.collection(this.dbPath, ref => ref.orderBy('timestamp', "desc"));
  }

  getPosts(): AngularFirestoreCollection<PostModel> {
    return this.postsReference;
  }

  create(post: PostModel) {
    return this.postsReference.add({...post});
  }

}
