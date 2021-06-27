export class Post{
  public content: string;
  public username: string;
  public date: Date;

  constructor(post: string, username: string, date: Date){
    this.content=post;
    this.username=username;
    this.date=date;
  }
}
