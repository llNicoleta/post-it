import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractControl} from "@angular/forms";
import {debounceTime, map, take} from "rxjs/operators";

export class TakenUsername {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const username = control.value.toLowerCase();
      return afs.collection('users', ref => ref.where('username', '==', username))
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? {usernameAvailable: false} : null)
        )
    }
  }
}
