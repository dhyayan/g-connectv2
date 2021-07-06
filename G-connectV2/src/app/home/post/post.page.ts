import { AngularFireStorage } from '@angular/fire/storage';
import { map, last, concatMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { RegUser } from 'src/app/models/reg-user.model';
import { PostService } from 'src/app/services/post.service';
import { RegUserService } from 'src/app/services/reg-user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  content: string;
  cUser: RegUser;
 posts: Post[];
teacher= false;
uploadedFile: Post;
date= new Date();
postUrl: string;
access= false;
downloadPost$: Observable<string>;
newPost: Post;
file='';


  constructor(private router: Router,
              private regS: RegUserService,
              private postS: PostService,
              private route: ActivatedRoute,
              private storage: AngularFireStorage) {

   }

   ngOnInit(){


 }

ionViewDidEnter(){

  this.postS.loadAllPosts().subscribe( val =>{
    this.posts=val;
    console.log(this.posts[0].id);

    console.log(val);
    val.sort((a, b) => (a.date > b.date ? -1 : 1));
    console.log(val);
    this.cUser=this.regS.cUser;
    if(this.cUser.role=== 'Moderator'){
      this.access=true;
    }

  }) ;

}
onPost(){
  if(this.postUrl){
  this.newPost  = new Post(this.content,this.cUser.name,this.date, this.postUrl);
  }else{
  this.newPost= new Post(this.content,this.cUser.name,this.date);
  }
  this.postS.addPost(this.newPost);
  this.content='';
}

postFile(event){
  const file=event.target.files[0];
  const filePath= `Posts/${this.posts[0].id}/postFile`;
  const task= this.storage.upload(filePath,file);

  this.downloadPost$=task.snapshotChanges().pipe(last(),concatMap(() => this.storage.ref(filePath)
  .getDownloadURL()));

  const postFile$=this.downloadPost$
  .pipe(concatMap(async (url) => this.postUrl=url));
  postFile$.subscribe(console.log);
}
}
