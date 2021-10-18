import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../models/post.model";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post: PostModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
