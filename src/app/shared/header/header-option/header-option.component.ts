import {Component, Input, OnInit} from '@angular/core';
import {HeaderOptionModel} from "../../../models/header-option.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'header-option',
  templateUrl: './header-option.component.html',
  styleUrls: ['./header-option.component.scss']
})
export class HeaderOptionComponent implements OnInit {
  @Input()
  option: HeaderOptionModel;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {}

  redirect() {
    if (this.option.link === 'home') {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['home']));
    } else if (this.option.link === 'user') {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['user', this.authService.currentUser.id]));
    } else if (this.option.link === 'dashboard') {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['dashboard']));
    }
  }
}
