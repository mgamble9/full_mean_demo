import { Injectable } from '@angular/core';
import { Http } from "@angular/http" // added when ready to try sending data to server

import "rxjs"

import { User } from "./user"


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  login(user: User){ // returns a promise
    return this.http.post("/login", user)
        .map(data => data.json())
        .toPromise()
    }

  get_all_users() {
    return this.http.get("/all_users")
      .map(data => data.json())
      .toPromise()
  }

  get_logged_in_user() {
    return this.http.get("/get_logged_in_user")
      .map(data => data.json())
      .toPromise()
  }


}
