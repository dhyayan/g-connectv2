import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegUser } from './models/reg-user.model';
import { AuthService } from './services/auth.service';
import { RegUserService } from './services/reg-user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  loggedIn: boolean;
  constructor(public authS: AuthService, private  router: Router, private regS: RegUserService) {}
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

}
