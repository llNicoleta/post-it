import {Component, OnInit} from '@angular/core';
import {HeaderOptionModel} from "../../models/header-option.model";
import {AvatarModel} from "../../models/avatar.model";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  avatar: AvatarModel = {
    alt: 'avatar'
  }

  searchValue = '';
  searchResults: Observable<UserModel[]>;

  headerOptions: Array<HeaderOptionModel> | undefined;

  constructor(public authService: AuthService, public afs: AngularFirestore, public afsAuth: AngularFireAuth, public router: Router) {
  }

  ngOnInit() {
    this.afsAuth.onAuthStateChanged(user => {
      this.authService.userState = user;
      if (user && user.uid !== null) {
        this.afs.collection<UserModel>('/users').valueChanges().subscribe(data => {
          data = data.filter(({id}) => id === user.uid);
          this.authService.currentUser = data[0];
          this.headerOptions = [
            {
              title: 'Home',
              avatar: null,
              icon: 'home',
              link: 'home'
            },
            {
              title: this.authService.currentUser?.username,
              avatar: {source: this.authService.currentUser?.photo, alt: 'avatar'},
              icon: '',
              link: 'user'
            },
          ]
        });
      }
    }).then()
  }

  search() {
    if (this.searchValue) {
      this.searchResults = this.afs.collection<UserModel>('users', ref => ref
        .orderBy("username")
        .startAt(this.searchValue.toLowerCase())
        .endAt(this.searchValue.toLowerCase() + "\uf8ff")
        .limit(10))
        .valueChanges();
    }
  }

  goToUserProfile(user: UserModel) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['user', user.id]).then(() => this.searchValue = ''));
  }
}
