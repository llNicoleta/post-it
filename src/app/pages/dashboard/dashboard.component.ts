import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: Array<UserModel>;

  constructor(private userService: UserService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.userService.getUsers().snapshotChanges().pipe(map(a =>
        a.map(data =>
          ({id: data.payload.doc.id, ...data.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

}
