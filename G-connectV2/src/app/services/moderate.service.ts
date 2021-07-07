import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Format } from '../models/Format.model';



import { convertSnaps } from '../services/db-utils';

@Injectable({
  providedIn: 'root'
})
export class ModerateService {
 questions: Format[];

  constructor(private http: HttpClient, private db: AngularFirestore) { }



    fetchData(status: boolean){
      return  this.db.collection('Threads',ref => ref.where('isModerated','==',status)).snapshotChanges().
 pipe(map (snaps =>  {

   const questions =convertSnaps<Format>(snaps);
   this.questions=questions;
   return questions;
 })
   );
  }

  fetchAnswers(status: boolean): Observable<Format[]>{
    return  this.db.collection('Answers',ref => ref.where('isModerated','==',status))
    .snapshotChanges()
    .pipe(map (snaps =>  convertSnaps<Format>(snaps))
      );
     }



     verifyQuestion(id: string,changes: Partial<Format>){
      this.db.doc(`Threads/${id}`).update(changes);
    }

    verifyAnswers(answer: Format,){
      const answerpath=answer.qid;

      this.db.collection(`Threads/${answerpath}/Answers`).add({
        content:answer.content,
        date:answer.date,
        isModerated:answer.isModerated,
        username:answer.username
      });

    }

onDeleteAnswer( currentAnswerId: string){
this.db.doc(`Answers/${currentAnswerId}`).delete();
}
onDeleteQuestion(id: string){
  this.db.doc(`Threads/${id}`).delete();
}

}
