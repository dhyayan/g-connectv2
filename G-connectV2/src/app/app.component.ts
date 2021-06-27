import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private authS: AuthService, private  router: Router) {}
  ngOnInit()
  {
    this.authS.autoLogIn();
    if(this.authS.loggedIn){
      this.router.navigate(['/home']);
    }
  }

onLogout(){
  this.authS.logOut();
}
}
