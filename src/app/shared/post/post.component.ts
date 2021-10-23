import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostModel} from "../../models/post.model";
import {CommentsService} from "../../services/comments.service";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";
import {CommentModel} from "../../models/comment.model";
import {Router} from "@angular/router";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post: PostModel;

  comments: CommentModel[];

  showComments: boolean;

  @Input()
  index: number;

  inputValue: string;

  constructor(private commentsService: CommentsService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.retrieveComments();
    this.showComments = false;
  }

  toggleShowComments() {
    this.showComments= !this.showComments;
  }

  retrieveComments() {
    this.commentsService.getComments(this.post.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
            const data = c.payload.doc.data() as CommentModel;
            return {id: c.payload.doc.id, ...data};
          }
        ))
    ).subscribe(data => {
      this.comments = data;
    })
  }

  addComment() {
    this.commentsService.addComment({
      userId: this.authService.currentUser.id,
      username: this.authService.currentUser.username,
      comment: this.inputValue,
      timestamp: Date.now(),
      postId: this.post.id
    }).then(() => this.inputValue = '');
  }

  countComments() {
    return this.comments && this.comments.length ? this.comments.length : 0;
  }

  goToUserProfile() {
    this.router.navigate(['user', this.post.userId]);
  }
}
