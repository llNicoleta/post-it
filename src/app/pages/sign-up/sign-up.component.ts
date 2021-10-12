import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  credentialsForm!: FormGroup;
  extraForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.buildCredentialsForm();
    this.buildExtraForm();
  }

  buildCredentialsForm() {
    this.credentialsForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
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
}
