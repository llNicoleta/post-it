import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  signIn() {
    this.authService.signIn(this.signInForm.value.username, this.signInForm.value.password).then();
  }
}
