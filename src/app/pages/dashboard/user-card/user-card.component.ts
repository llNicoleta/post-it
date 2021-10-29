import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {PostsService} from "../../../services/posts.service";
import {CommentsService} from "../../../services/comments.service";
import {PostModel} from "../../../models/post.model";
import {map} from "rxjs/operators";
import {CommentModel} from "../../../models/comment.model";

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input()
  user: UserModel;
  userPosts: Array<PostModel>;
  userComments: Array<CommentModel>;

  constructor(public userService: UserService, private postsService: PostsService, private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.postsService.getPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
            const data = c.payload.doc.data() as PostModel;
            return {id: c.payload.doc.id, data}
          }
        )
      )
    ).subscribe(data => {this.userPosts = data.filter(res => res.data.userId === this.user.id);}
  );

    this.commentsService.getComments().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
            const data = c.payload.doc.data() as CommentModel;
            return {id: c.payload.doc.id, data}
          }
        )
      )
    ).subscribe(data => {
      this.userComments = data.filter(res => res.data.userId === this.user.id);
    });
  }

  deleteUser() {
    for (const comment of this.userComments) {
      this.commentsService.deleteComment(comment.id);
    }
    for (const post of this.userPosts) {
      this.postsService.delete(post.id);
    }
    this.userService.deleteUser(this.user.id);
  }
}
