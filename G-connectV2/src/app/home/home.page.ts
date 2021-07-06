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
  showInput=false;
  message: string;
  newPassword='';
  user: RegUser;
acess=false;
  loggedIn = false;

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
           if (user.role==='Moderator'){
             this.acess=true;
           }
           this.loggedIn=this.authS.loggedIn;
         });
      }

    });



  }









onShowInput(){
  this.showInput=!this.showInput;

}
onChangePassword(newPassword: string){
  console.log(newPassword);
  this.authS.afAuth.user.subscribe(val =>{
    val.updatePassword(newPassword).then(() =>{
    this.message='Your password has been sucessfully changed ';
    }).catch(error => {
      this.message=error;
      console.log(error);
    }
      );
  });
  newPassword='';
  this.showInput=false;
}
onLogout(){
  this.authS.logOut();
}
removeError(){
  this.message=null;
}


}
