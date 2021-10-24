import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TakenUsername} from "../../shared/validators/taken-username";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  credentialsForm!: FormGroup;
  extraForm!: FormGroup;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.buildCredentialsForm();
    this.buildExtraForm();
  }

  buildCredentialsForm() {
    this.credentialsForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{4,15}$')], TakenUsername.username(this.afs)),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  buildExtraForm() {
    this.extraForm = new FormGroup({
      firstName: new FormControl('', Validators.pattern('^[A-Za-z-]{1,20}$')),
      lastName: new FormControl('', Validators.pattern('^[A-Za-z\ -]{1,20}$')),
      description: new FormControl('', Validators.pattern('^[A-Za-z0-9\ _\?!\.#()-]{1,100}$')),
      photo: new FormControl(null)
    })
  }

  get username() {
    return this.credentialsForm.get('username');
  }

  get email() {
    return this.credentialsForm.get('email');
  }

  get password() {
    return this.credentialsForm.get('password');
  }

  get firstName() {
    return this.extraForm.get('firstName');
  }

  get lastName() {
    return this.extraForm.get('lastName');
  }

  get description() {
    return this.extraForm.get('description');
  }

  signUp() {
    const user: UserModel = {
      username: this.credentialsForm.value.username,
      email: this.credentialsForm.value.email,
      password: this.credentialsForm.value.password,
      firstName: this.extraForm.value.firstName,
      lastName: this.extraForm.value.lastName,
      description: this.extraForm.value.description,
      photo: this.extraForm.value.photo,
      isModerator: false
    }
    this.authService.signUp(user).then(r => console.log(r));
  }
}
