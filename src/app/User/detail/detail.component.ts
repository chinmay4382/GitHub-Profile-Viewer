import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private user;
  routerLink: string;

  constructor(public usersService: UserService) {
    this.user = this.usersService.getOption();
    console.log('in 2nd component' + this.user);
  }

  ngOnInit() {
  }
}
