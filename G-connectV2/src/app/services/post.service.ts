/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { Post } from '../models/post.model';

@Injectable({providedIn:'root'})
export class PostService{

  constructor(private db: AngularFirestore ){


}


loadAllPosts(): Observable <Post[]> {
  return  this.db.collection('Posts').snapshotChanges().
   pipe(map (snaps => {
    return convertSnaps<Post>(snaps)
    }
     )
   );

   }
addPost(newPost: Post){
console.log(newPost);
  this.db.collection('Posts').add(

    {content:newPost.content,
    date:newPost.date,
    username:newPost.username}
    );
}





}







