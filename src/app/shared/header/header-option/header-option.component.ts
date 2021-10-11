import {Component, Input, OnInit} from '@angular/core';
import {HeaderOptionModel} from "../../../models/header-option.model";

@Component({
  selector: 'header-option',
  templateUrl: './header-option.component.html',
  styleUrls: ['./header-option.component.scss']
})
export class HeaderOptionComponent implements OnInit {
  @Input()
  option: HeaderOptionModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
