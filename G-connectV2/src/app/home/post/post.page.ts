import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { RegUser } from 'src/app/models/reg-user.model';
import { PostService } from 'src/app/services/post.service';
import { RegUserService } from 'src/app/services/reg-user.service';
import { Pipe, PipeTransform } from '@angular/core';

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
date= new Date();


  constructor(private router: Router, private regS: RegUserService, private postS: PostService, private route: ActivatedRoute) {

   }

   ngOnInit(){

 }

ionViewDidEnter(){
  this.postS.loadAllPosts().subscribe( val =>{
    this.posts=val;
    val.sort((a: Post, b: Post): number =>
    {
      if(a.date>b.date){
          return;
      }
    });
    this.cUser=this.regS.cUser;
    console.log(this.cUser);
  }) ;


}
onPost(){
  const newPost= new Post(this.content,this.cUser.name,this.date);
  this.postS.addPost(newPost);
}

}
// .pipe(map(arr => arr.sort((a: Post , b: Post) => a.date>b.date)))
