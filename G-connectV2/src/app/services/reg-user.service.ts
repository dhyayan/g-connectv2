import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { convertSnaps } from './db-utils';
import { RegUser } from '../models/reg-user.model';
import { UserSignIn } from '../models/usersignin.model';


@Injectable({providedIn:'root'})
export class RegUserService{
cUser: RegUser;
allUsers: RegUser[];

  constructor(private http: HttpClient, private authS: AuthService, private db: AngularFirestore){

  }

  loadAllUsers(email: string): Observable <RegUser[]> {
    return  this.db.collection('Users', ref => ref.where('email','!=',email)).snapshotChanges().
     pipe(map (snaps =>  convertSnaps<RegUser>(snaps)
       )
       );
     }
 onCreateUser(newUser: UserSignIn){
this.db.collection('Users').add(newUser);
}


getUserByEmail(email: string): Observable<RegUser>{
return this.db.collection('Users',ref => ref.where('email','==',email)).snapshotChanges().
pipe(map (snaps =>  {
  const user= convertSnaps<RegUser>(snaps);
 return user.length ===1? user[0]: undefined;
}

  )
);
};
getUserByName(name: string): Observable<RegUser>{
  return this.db.collection('Users',ref => ref.where('name','==',name)).snapshotChanges().
  pipe(map (snaps =>  {
    const user= convertSnaps<RegUser>(snaps);

    return user.length ===1? user[0]: undefined;
  }

    ),first()
  );
  };
  getUserByRole(role: string): Observable<RegUser[]>{
    return this.db.collection('Users',ref => ref.where('role','==',role)).snapshotChanges().
    pipe(map (snaps =>  {
      const user= convertSnaps<RegUser>(snaps);

      return user.slice();
    }
      )
    );
    };


 updateUserDetail(id: string, changes: Partial<RegUser>): Observable<any>{
  return from(this.db.doc(`Users/${id}`).update(changes));
 }

}
