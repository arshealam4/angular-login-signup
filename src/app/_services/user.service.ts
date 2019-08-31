import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

    private static registerUserURL = `${environment.apiURL}/users/signup`;
    private static loginUserURL = `${environment.apiURL}/users/login`;
    private static getAllUserURL = `${environment.apiURL}/users/user-list`;

  constructor(private http: HttpClient) {

  }

  registerUser(user) {
    return this.http.post<any>(UsersService.registerUserURL, user);
  }

  loginUser(user) {
    return this.http.post<any>(UsersService.loginUserURL, user);
  }

  getUserList() {
    return this.http.get<any>(UsersService.getAllUserURL);
  }

}
