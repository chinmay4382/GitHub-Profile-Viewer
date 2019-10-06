import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private data = {};
 private getUsersUrl = 'http://127.0.0.1:3000/search';
  setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;

  }
  constructor(private http: HttpClient, private router: Router) { }
  getUsers(q, page, pageSize) {
    console.log(q + page + pageSize);
    return (this.http.get(this.getUsersUrl + '?' + 'q=' + q + '&page=' + page + '&size=' + pageSize));

  }

}


