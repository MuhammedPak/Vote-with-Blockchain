import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  private _loginUrl = "http://localhost:3000/user/login";

  tc : any;
  voteStatus: any;
  cryptedVote:any;
  
  constructor(private http: HttpClient,
    private _router: Router) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  registerUser(user){
      return this.http.post('http://localhost:3000/user/register/', user , httpOptions);
  }

}
