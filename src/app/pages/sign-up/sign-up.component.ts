import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  credentialsForm!: FormGroup;
  extraForm!: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildCredentialsForm();
    this.buildExtraForm();
  }

  buildCredentialsForm() {
    this.credentialsForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  buildExtraForm() {
    this.extraForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      description: new FormControl(''),
      photo: new FormControl(null)
    })
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
