import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authS: AuthService,private router: Router){}
    canActivate(route: ActivatedRouteSnapshot,router: RouterStateSnapshot):
   |boolean
   |UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>{

return this.authS.afAuth.authState.pipe(map(val =>{
  if(val){
    return true;
  }
  return  this.router.createUrlTree(['']);
})

);
  }
}


