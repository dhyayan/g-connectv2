
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
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


  signUp(email: string, password: string ) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
      });
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          // this.sendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
        }

      });
  }

logOut(){
  this.afAuth.signOut().then(
    () =>  this.router.navigate(['auth'])

  );

}




}
