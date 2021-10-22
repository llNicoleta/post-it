import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../models/post.model";
import {PostsService} from "../../services/posts.service";
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts: Array<PostModel>;
  inputValue: string = '';

  constructor(private postsService: PostsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.postsService.getPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.posts = data;
    });
  }

  addPost(): void {
    this.postsService.create({
      userId: this.authService.currentUser?.id,
      username: this.authService.currentUser?.username,
      description: this.authService.currentUser?.description,
      message: this.inputValue,
      imageUrl: '',
      timestamp: Date.now()
    }).then(() => this.inputValue = '');
  }
}
