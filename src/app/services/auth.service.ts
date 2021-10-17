import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState: any;
  currentUser: UserModel | undefined;

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
        this.afs.collection<UserModel>('Users').valueChanges().subscribe(data => {
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
          this.afs.collection<UserModel>('Users').valueChanges().subscribe(data => {
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
        this.afs.collection('Users').doc(result.user?.uid).set({
          id: result.user?.uid,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          photo: user.photo,
          isModerator: user.isModerator
        }).then(r => {
          this.router.navigate(['home']).then();
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return (user && this.currentUser);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']).then();
    }).catch(err => console.log(err))

  }
}
