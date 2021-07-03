import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { Observable } from 'rxjs';
import { Format } from '../models/Format.model';
import { Forum } from '../models/forum.model';






@Injectable({
  providedIn: 'root'
})
export class ForumService {
questions: Format[];

  constructor(private http: HttpClient,private db: AngularFirestore) { }


  getCurrentForum(id: string){
for ( const question of this.questions){
  if( question.id === id ){
    return question;
  }
}
  }



  onStoreForum(){


    }

    fetchQuestion(status: boolean): Observable<Format[]>{
return  this.db.collection('Threads',ref => ref.where('isModerated','==',status)).snapshotChanges().
 pipe(map (snaps =>  {

   const questions =convertSnaps<Format>(snaps);
   this.questions=questions;
   return questions;
 })
   );
 }

 fetchAnswers(status: boolean, id: string): Observable<Format[]>{
return  this.db.doc(`Threads/${id}`).collection('Answers',ref => ref.where('isModerated','==',status))
.snapshotChanges()
.pipe(map (snaps =>  convertSnaps<Format>(snaps))
  );
 }


    onAddAswer(id: string, answer: Format,question: string ){
      this.db.collection('Answers').add({
        content:answer.content,
        date:answer.date,
        isModerated:answer.isModerated,
        username:answer.username,
        qid:id,
        question
      });

    }
    onCreateFourm(newForum: Forum){
      console.log(newForum);


      this.db.collection('Threads').add({  ...newForum.question});

    }


}
