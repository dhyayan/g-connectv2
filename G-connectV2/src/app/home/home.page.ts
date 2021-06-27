import { Component } from '@angular/core';
import { RegUser } from '../models/reg-user.model';
import { AuthService } from '../services/auth.service';
import { RegUserService } from '../services/reg-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loggedIn=false;
  user: RegUser;


  constructor(private authS: AuthService, private regS: RegUserService) {
     }


  ionViewWillEnter(){

    if (this.authS.currentUserEmail){
      this.regS.getUserByEmail(this.authS.currentUserEmail)
       .subscribe(user =>{
         this.user=user;
         this.regS.cUser=user;
         this.authS.currentUser=user;
         console.log(this.authS.loggedIn);
         this.loggedIn=this.authS.loggedIn;
       });
      } else {
        console.log('no logged in ');
      }
      console.log(this.user);
  }


  onLogOut(){
    this.authS.logOut();

  }

}
