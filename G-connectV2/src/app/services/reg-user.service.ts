import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { convertSnaps } from './db-utils';
import { RegUser } from '../models/reg-user.model';



@Injectable({providedIn:'root'})
export class RegUserService{
cUser: RegUser;
allUsers: RegUser[];
moderator=false;
  constructor(private http: HttpClient, private authS: AuthService, private db: AngularFirestore){

  }

  loadAllUsers(): Observable <RegUser[]> {
    return  this.db.collection('Users', ref => ref.where('role','!=','Moderator')).snapshotChanges().
     pipe(map (snaps =>  convertSnaps<RegUser>(snaps)
       )
       );
     }
 onCreateUser(newUser: unknown){

this.db.collection('Users').add(newUser);
}


getUserByEmail(email: string): Observable<RegUser>{
  return this.db.collection('Users',ref => ref.where('email','==',email)).snapshotChanges().
  pipe(map (snaps =>  {
    const user= convertSnaps<RegUser>(snaps);
this.cUser=user[0];
    return user.length ===1? user[0]: undefined;
  }

    )
  );
  }
  getUserByRole(role: string): Observable<RegUser[]>{
    return this.db.collection('Users',ref => ref.where('role','==',role)).snapshotChanges().
    pipe(map (snaps =>  {
      const user= convertSnaps<RegUser>(snaps);

      return user.slice();
    }
      )
    );
    }


 updateUserDetail(id: string, changes: Partial<RegUser>): Observable<any>{
  return from(this.db.doc(`Users/${id}`).update(changes));
 }




filterUserByEmail(email: string ){
  for (const user of this.allUsers){
    if (user.email===email){
return user;
    }
  }
}
}
