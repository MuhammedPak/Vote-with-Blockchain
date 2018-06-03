import { Component,Input } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {

  
  public status : any;
  cryptedVote : any;
  loginUserData : any = {};
  constructor(private _auth: AuthService, private _router: Router) { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          this.status = res.voteStatus;
          this.cryptedVote = res.cryptedVote;
          localStorage.setItem('token',res.token);
          localStorage.setItem('tc',res.tc);
          localStorage.setItem('voteStatus',res.voteStatus);
          this._router.navigate(['/home']);
        },
        err => console.log(err)
      );
    }

}
