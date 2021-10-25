import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import firebase from "firebase/compat";
import { AvatarModel } from 'src/app/models/avatar.model';
import {map} from "rxjs/operators";
import {CommentModel} from "../../models/comment.model";
import {PostsService} from "../../services/posts.service";
import {PostModel} from "../../models/post.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: string | null;
  user: UserModel;
  posts?: Array<PostModel>

  avatar: AvatarModel;

  backdropUrl = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService, private postsService: PostsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.userId = <string>this.route.snapshot.paramMap.get('id');
    this.subscription = this.userService.getUser(this.userId!).subscribe(data => this.user = data);
    this.avatar = {
      // source: this.user?.photo,
      size: 'lg'
    }
    this.retrievePosts();
  }

  retrievePosts() {
    this.postsService.getUserPosts(this.userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
            const data = c.payload.doc.data() as CommentModel;
            return {id: c.payload.doc.id, ...data};
          }
        ))
    ).subscribe(data => {
      this.posts = data;
    })
  }

  countPosts() {
    return this.posts && this.posts.length ? this.posts.length : 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  makeModerator() {
    this.userService.makeModerator(this.userId!);
  }
}
