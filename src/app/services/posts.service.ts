import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {PostModel} from "../models/post.model";
import {CommentModel} from "../models/comment.model";
import {CommentsService} from "./comments.service";
import {ReactionService} from "./reaction.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private dbPath = '/posts';
  postsReference: AngularFirestoreCollection<PostModel>;

  constructor(private afs: AngularFirestore, private commentsService: CommentsService, private reactionService: ReactionService) {
    this.postsReference = this.afs.collection(this.dbPath, ref => ref.orderBy('timestamp', "desc"));
  }

  getPosts(): AngularFirestoreCollection<PostModel> {
    return this.postsReference;
  }

  create(post: PostModel) {
    return this.postsReference.add({...post});
  }

  delete(postId?: string) {
    let comments: Array<CommentModel>;
    this.commentsService.getPostComments(postId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
            const data = c.payload.doc.data() as CommentModel;
            return {id: c.payload.doc.id, ...data};
          }
        ))
    ).subscribe(data => {
      comments = data;
    })
    if (comments!) {
      for (const comment of comments) {
        this.commentsService.deleteComment(comment.id);
      }
    }
    this.reactionService.deleteReactions(postId);
    this.postsReference.doc(postId).delete();
  }

  getUserPosts(userId: string | null) {
    return this.afs.collection(this.dbPath, ref => ref.orderBy('timestamp', 'desc').where('userId', '==', `${userId}`));
  }
}
