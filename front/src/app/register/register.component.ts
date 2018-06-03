import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  
  registerUserData : any = {}

  constructor(private _auth : AuthService,  private _router: Router) { }

  ngOnInit() {
  }
  registerUser(){
    let data = JSON.stringify(this.registerUserData);
      this._auth.registerUser(data)
      .subscribe(
        res => {
          
          this._router.navigate(['/login']);
        },
        err => console.log(err)
      );
      console.log(data);
    }

}
