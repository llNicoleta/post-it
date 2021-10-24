import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../../models/comment.model";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {CommentsService} from "../../../services/comments.service";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";
import {Observable, Subscription} from "rxjs";
import {share} from "rxjs/operators";

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: CommentModel;

  user: Observable<UserModel>;

  constructor(public authService: AuthService, private router: Router, private commentsService: CommentsService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser(this.comment.userId).pipe(share());
  }

  goToUserProfile() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['user', this.comment.userId]));
  }

  canDelete() {
    return this.authService.currentUser && this.comment && (this.comment.userId === this.authService.currentUser.id || this.authService.currentUser.isModerator);
  }


  deleteComment() {
    this.commentsService.deleteComment(this.comment.id);
  }
}
