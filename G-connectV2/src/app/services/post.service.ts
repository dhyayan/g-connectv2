/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
import { from, Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { Post } from '../models/post.model';
import { stringify } from '@angular/compiler/src/util';

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
    username:newPost.username,
    uploadedPost: newPost.uploadedPost}
    );

}
addFile(id: string, changes: Partial<Post>){
  return from(this.db.doc(`Posts/${id}`).update(changes));
}




}







