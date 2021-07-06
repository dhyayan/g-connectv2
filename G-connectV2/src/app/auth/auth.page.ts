import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  loggedIn: boolean;
  constructor(public authS: AuthService, private  router: Router) {}
  ngOnInit()
  {


  }
ionViewDidEnter(){
  this.authS.afAuth.authState.subscribe(val =>
    {
      console.log('working1');
      console.log(val);
      console.log(this.authS.verified);
      if (val && this.authS.verified){
        this.authS.loggedIn=true;
          console.log('working');
        this.router.navigate(['home/about-us']);
      }
    }
   );

}
}

