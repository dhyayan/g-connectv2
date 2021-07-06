export class Post{
  public content: string;
  public username: string;
  public date: Date;
  public uploadedPost?: string;
id?: string;
  constructor(post: string, username: string, date: Date, uploadedPost?: string){
    this.content=post;
    this.username=username;
    this.date=date;
    this.uploadedPost=uploadedPost;
  }
}
