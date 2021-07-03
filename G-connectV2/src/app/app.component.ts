import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  showInput=false;
  message: string;
  newPassword='';
  constructor(private authS: AuthService, private  router: Router) {}
  ngOnInit()
  {

 this.authS.afAuth.authState.subscribe(val =>
  {
    if (val && this.authS.verified){
      this.authS.loggedIn=true;
      this.router.navigate(['home']);
    }
  }
 );
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
