/* eslint-disable no-underscore-dangle */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RegUser } from '../models/reg-user.model';
import { UserSignIn } from '../models/usersignin.model';





export interface AuthDataResponse{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}
@Injectable({
  providedIn:'root'
})
export class AuthService {
  currentUser: RegUser;
  user=new BehaviorSubject<UserSignIn>(null);
  loggedIn=false;
  currentUserEmail: string;
  private tokenExpTimer: any;


  constructor(private http: HttpClient , private router: Router){
    this.user = new BehaviorSubject<UserSignIn>(JSON.parse(localStorage.getItem('userDetail')));
    // this.userDetails = this.user.asObservable();
  }

  public get userValue(): UserSignIn {
    return this.user.value;
  }

  signUp(email: string,password: string){
    return this.http.post<AuthDataResponse>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCc3TPhObdweiCl8xcUkwGND6L9Hf2hdc0',
    {

      email,
      password,
      secureToken:true
    }).pipe(catchError(this.handleError),tap( resData => {
      this.handleAuth(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    }));
  }
    logIn(email: string ,password: string){
      return this.http.post<AuthDataResponse>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc3TPhObdweiCl8xcUkwGND6L9Hf2hdc0'
       ,{
        email,
        password,
        returnSecureToken:true
         }
      ).pipe(catchError(this.handleError),
      tap(resData=>{
       this.handleAuth(
         resData.email,
         resData.localId,
         resData.idToken,
         +resData.expiresIn
         );


        })
        );


        }



        autoLogIn(){

          const userData: {
            email: string;
            id: string ;
            _token: string;
             _tokenExpirationDate: string;
          }= JSON.parse(localStorage.getItem('userDetail'));
         if (!userData){
           console.log('data not found ');
           return ;
         }
     const loadedUser= new UserSignIn(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
     if (loadedUser.token){
       this.user.next(loadedUser);
       this.loggedIn=true;
       this.currentUserEmail=userData.email;
       const expirationDuration = new Date ( userData._tokenExpirationDate).getTime()-new Date().getTime();

     }

       }


        logOut(){
          localStorage.removeItem('userDetail');
          this.user.next(null);
          this.loggedIn=false;
              this.router.navigate(['login']);
        }
private handleAuth(email: string,userId: string,token: string,expiresIn: number){
      const expirationDate= new Date( new Date().getTime() + expiresIn *1000);
      const user=new UserSignIn(email,userId,token,expirationDate);
      this.user.next(user);
      this.currentUserEmail=email;
      localStorage.setItem('userDetail',JSON.stringify(user));
   }

    private handleError(errorRes: HttpErrorResponse){
      let errorMes='An unknown error occured';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMes);
      }
      switch(errorRes.error.error.message){
       case 'EMAIL_EXISTS':
         errorMes='This email already exists';
         break;
         case 'EMAIL_NOT_FOUND':
           errorMes='Incorrect E-Mail !!! ';
           break;
           case 'INVALID_PASSWORD':
             errorMes=' Incorrect Password';
             break;
     }
     return throwError(errorMes);
    }
}
