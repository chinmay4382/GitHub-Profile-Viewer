import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {DetailComponent} from '../detail/detail.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private searchValue = '';
  private user;
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  // tslint:disable-next-line:max-line-length
  private users: ({ profileUrl: string; handler: string; followers: number; repos: number; following: number; name: string; bio: string; company: string })[];
  private page: number;

  constructor(public usersService: UserService) {
  }

  ngOnInit() {
  }

  onUsersSet(search) {
    this.usersService.setOption('object', search);

  }

  onUserDetailGet(search: string, page: number, pageSize: number) {
    this.usersService.getUsers(search, page, pageSize).subscribe(
      responseData => {
        // @ts-ignore
        this.users = responseData.object;
      }
    );
  }


}
