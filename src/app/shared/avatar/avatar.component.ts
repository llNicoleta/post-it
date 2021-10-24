import {Component, Input, OnInit} from '@angular/core';
import {AvatarModel} from "../../models/avatar.model";

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  @Input()
  avatar?: AvatarModel;

  source: string;
  defaultAvatar = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.studnet.com.co%2Fwp-content%2Fuploads%2F2016%2F10%2Fdefault-avatar-1024x1024.png&f=1&nofb=1';

  constructor() { }

  ngOnInit(): void {
    this.source = `${this.avatar?.source}`
  }

}
