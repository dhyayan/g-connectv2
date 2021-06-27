import { Format } from './Format.model';

export class Forum{
 public question: Format;
 public answers?: Format[];
 private isModified: boolean;




constructor(question: Format,answer?: Format){
  this.question=question;
  this.isModified=false;

  if(answer){
  this.answers.push(answer);
}
else {
  this.answers=[];
}

}
get status(){
  return this.isModified;
}
}
