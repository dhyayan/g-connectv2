export class Format{
  public content: string;
 public  username: string;
 public  date: Date;
 public id?: string;
 public qid?: string ;
 isModerated: boolean;
public question?: string;
 constructor(content: string,username: string,isModerated: boolean,date: Date){
  this.content=content;
  this.username=username;
  this.date=date;
  this.isModerated=isModerated;
}


}
