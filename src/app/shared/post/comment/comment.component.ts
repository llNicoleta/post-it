import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../../models/comment.model";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: CommentModel;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
