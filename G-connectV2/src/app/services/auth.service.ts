
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
verified=false;
acess=false;
error: string;
  loggedIn = false;

currentUserEmail: string ;
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router, // Inject Route Service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
  }

  async sendVerificationMail() {
    return this.afAuth.currentUser.then(data =>  data.sendEmailVerification()  .then(() => {
      console.log('verification sent');
    })
    );

  }


  async signUp(email: string, password: string ) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendVerificationMail();
  }

  async signIn(email: string, password: string){
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    if (result.user.emailVerified !== true) {
      this.sendVerificationMail();
      this.verified = false;
      this.error='Please check your email and verify to login';

      return;
    }else {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    }
    this.verified = true;

  }

logOut(){
  this.afAuth.signOut().then(
    () =>  this.router.navigate(['auth'])

  );

}




}
