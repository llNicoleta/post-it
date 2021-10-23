import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../../models/comment.model";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {CommentsService} from "../../../services/comments.service";

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: CommentModel;

  constructor(public authService: AuthService, private router: Router, private commentsService: CommentsService) {
  }

  ngOnInit(): void {
  }

  goToUserProfile() {
    this.router.navigate(['user', this.comment.userId]);
  }

  canDelete() {
    return this.authService.currentUser && this.comment && (this.comment.userId === this.authService.currentUser.id || this.authService.currentUser.isModerator);
  }


  deleteComment() {
    this.commentsService.deleteComment(this.comment.id);
  }
}
