import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegUserService } from 'src/app/services/reg-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  error: string = null;
  signupForm = new FormGroup({
    name: new FormControl(''),
    rollno: new FormControl(''),
    role: new FormControl(''),
    dept: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email,Validators.pattern('[a-zA-Z0-9]+@gvpce.ac.in')]),
    password: new FormControl('')
  });
  constructor(private authS: AuthService,
              private regUserS: RegUserService,
              private router: Router) { }

  ngOnInit() {}
onSignUp(){

      this.authS.signUp(this.signupForm.value.email,this.signupForm.value.password).catch(error => this.error=error);
      this.signupForm.reset();
      this.signupForm.removeControl('password');
      this.regUserS.onCreateUser(this.signupForm.value);

    }




onHome(){
  this.router.navigate(['/home/login']);
}
removeErr(){
  this.error= null;
}

get email(){return this.signupForm.get('email');}
}



