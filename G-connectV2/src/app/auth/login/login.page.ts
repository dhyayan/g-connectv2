import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  error: string = null;
  isLoading= false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authS: AuthService,
              private router: Router,) { }


  ngOnInit() {}


onLogin(){
this.authS.signIn(this.loginForm.value.email,this.loginForm.value.password).catch((error) => {
  this.error=error;
});
this.loginForm.reset();
}

removeError(){
  this.error=null;
}

}




