import { Component, OnInit } from '@angular/core';
import { RegUser } from '../models/reg-user.model';
import { AuthService } from '../services/auth.service';
import { RegUserService } from '../services/reg-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  loggedIn = false;
  user: RegUser;
  constructor(private authS: AuthService, private regS: RegUserService) {
  }
ionViewWillEnter(){
  this.authS.afAuth.user.subscribe(val =>
    {
      if(val ){
        this.authS.currentUserEmail=val.email;
        this.regS.getUserByEmail(val.email)
         .subscribe(user =>{
           this.user=user;
           this.regS.cUser=user;

           this.loggedIn=this.authS.loggedIn;
         });
      }

    });
}









}
