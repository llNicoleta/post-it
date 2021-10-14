import {Component, OnInit} from '@angular/core';
import {HeaderOptionModel} from "../../models/header-option.model";
import {AvatarModel} from "../../models/avatar.model";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  avatar: AvatarModel = {
    alt: 'avatar'
  }

  headerOptions: Array<HeaderOptionModel> | undefined;

  constructor(public authService: AuthService, public afs: AngularFirestore, public afsAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.afsAuth.onAuthStateChanged(user => {
      this.authService.userState = user;
      if (user && user.uid !== null) {
        this.afs.collection<UserModel>('Users').valueChanges().subscribe(data => {
          data = data.filter(({id}) => id === user.uid);
          this.authService.currentUser = data[0];
          this.headerOptions = [
            {
              title: 'Home',
              avatar: null,
              icon: 'home'
            },
            {
              title: this.authService.currentUser?.username,
              avatar: {source: this.authService.currentUser?.photo, alt: 'avatar'},
              icon: ''
            },
          ]
        });
      }
    }).then()
  }

}
