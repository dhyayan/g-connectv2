import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Format } from 'src/app/models/Format.model';
import { Forum } from 'src/app/models/forum.model';
import { RegUser } from 'src/app/models/reg-user.model';
import { ForumService } from 'src/app/services/forum.service';
import { RegUserService } from 'src/app/services/reg-user.service';

@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.page.html',
  styleUrls: ['./create-discussion.page.scss'],
})
export class CreateDiscussionPage implements OnInit {

  question: string;
  user: RegUser;
 forum: Forum;

  constructor(private forumS: ForumService, private router: Router, private regS: RegUserService) {
      this.user=this.regS.cUser;
   }

  ngOnInit() {}


  createDiscussion(){
    if (this.regS.moderator){
       this.forum=new Forum(new Format( this.question,this.user.name,true,new Date()));
    }else{
      this.forum=new Forum(new Format( this.question,this.user.name,false,new Date()));

    }
    this.forumS.onCreateFourm(this.forum);
 this.router.navigate(['home/discussion']);
  }





}
