// import { Injectable } from '@angular/core';
// import {  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { RegUser } from '../home/reg-user.model';
// import { AuthService } from './auth.service';
// import { RegUserService } from './reg-user.service';

// @Injectable({
//   providedIn:'root'
// })
// export class ProfileResolve{
//   constructor(private regS: RegUserService, private authS: AuthService, ) { }
// resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegUser> {
//   const name=route.paramMap.get('name');
//   console.log(name);
// const value= this.regS.getUserByName(name);
// console.log(value);
// return value;

// }


// }
