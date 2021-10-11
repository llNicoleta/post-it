import { Component, OnInit } from '@angular/core';
import {HeaderOptionModel} from "../../models/header-option.model";
import {AvatarModel} from "../../models/avatar.model";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  avatar: AvatarModel = {
    alt: 'avatar'
  }

  headerOptions: Array<HeaderOptionModel> = [
    {
      title: 'Home',
      avatar: null,
      icon: 'home'
    },
    {
      title: 'me',
      avatar: this.avatar,
      icon: ''
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
