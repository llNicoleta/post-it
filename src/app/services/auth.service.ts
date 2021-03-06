import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dbPath = '/users';
  userState: any;
  currentUser: UserModel;

  avatar = 'https://eu.ui-avatars.com/api/?';

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user')!);
        this.afs.collection<UserModel>(this.dbPath).valueChanges().subscribe(data => {
          data = data.filter(({id}) => id === user.uid!);
          this.currentUser = data[0];
        });
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(username: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(username, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.afs.collection<UserModel>(this.dbPath).valueChanges().subscribe(data => {
            data = data.filter(({id}) => id === result.user?.uid);
            this.currentUser = data[0];
          });
          this.router.navigate(['home']).then();
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  signUp(user: UserModel) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, <string>user.password)
      .then((result) => {
        let avatarName = user.firstName && user.lastName ? `${user.firstName}+${user.lastName}` : user.username;
        this.afs.collection(this.dbPath).doc(result.user?.uid).set({
          id: result.user?.uid,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          photo: `${this.avatar}name=${avatarName}&background=4285F4&color=fff`,
          isModerator: user.isModerator
        }).then(() => {
          this.router.navigate(['home']).then();
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return user && this.userState;
  }

  get isModerator() {
    return this.isLoggedIn && this.currentUser.isModerator;
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    }).catch(err => console.log(err))

  }
}
