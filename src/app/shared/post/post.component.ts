import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostModel} from "../../models/post.model";
import {CommentsService} from "../../services/comments.service";
import {AuthService} from "../../services/auth.service";
import {map, share} from "rxjs/operators";
import {CommentModel} from "../../models/comment.model";
import {Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {ReactionService} from "../../services/reaction.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post: PostModel;

  user: Observable<UserModel>;

  comments: CommentModel[];

  showComments: boolean;

  inputValue: string;

  constructor(private commentsService: CommentsService,
              public authService: AuthService,
              private router: Router,
              private postsService: PostsService,
              private reactionService: ReactionService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser(this.post.userId).pipe(share());
    this.retrieveComments();
    this.showComments = false;

  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }

  retrieveComments() {
    this.commentsService.getPostComments(this.post.id).snapshotChanges().pipe(
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
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['user', this.post.userId]));
  }

  canDelete() {
    return this.authService.currentUser && this.post && (this.post.userId === this.authService.currentUser.id || this.authService.currentUser.isModerator);
  }

  deletePost() {
    this.postsService.delete(this.post.id);
  }
}
