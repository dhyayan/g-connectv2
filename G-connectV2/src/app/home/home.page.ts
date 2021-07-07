import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
  updateEmail=false;
  message: string;
  newPassword='';
  user: RegUser;
acess=false;
  loggedIn = false;
  newEmail='';

  constructor(private authS: AuthService, private regS: RegUserService, private menuCtrl: MenuController) {
  }
ionViewWillEnter(){
  console.log('entering home ');
  this.authS.afAuth.user.subscribe(val =>
    {
      if(val ){
        this.authS.currentUserEmail=val.email;
        this.regS.getUserByEmail(val.email)
         .subscribe(user =>{
           this.user=user;
           console.log(user);
           this.regS.cUser=user;
           if (user.role==='Moderator'){
             this.acess=true;
             this.regS.moderator=true;
           }
           else{
             this.acess=false;
           }
           this.loggedIn=this.authS.loggedIn;
         });
      }

    });



  }

  closeMenu(){
    this.menuCtrl.close();
  }



onUpdateEmail(){
  this.updateEmail=!this.updateEmail;
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
changeEmail(email: string){
  this.authS.afAuth.user.subscribe(val =>{
    val.updateEmail(email).then(() =>{

    this.message='Your email has been sucessfully changed ';
    }).catch(error => {
      this.message=error;
     return;
    }
      );
  });
  this.updateEmail=!this.updateEmail;
  this.regS.updateUserDetail(this.user.id,{email});
  this.newEmail='';
}
onLogout(){
  this.authS.logOut();
}
removeError(){
  this.message=null;
}


}
