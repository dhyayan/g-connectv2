import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Format } from 'src/app/models/Format.model';
import { Forum } from 'src/app/models/forum.model';
import { RegUser } from 'src/app/models/reg-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.page.html',
  styleUrls: ['./create-discussion.page.scss'],
})
export class CreateDiscussionPage implements OnInit {

  question: string;
  user: RegUser;


  constructor(private forumS: ForumService, private router: Router, private authS: AuthService) {
      this.user=this.authS.currentUser;
   }

  ngOnInit() {}


  createDiscussion(){
const forum=new Forum(new Format( this.question,this.user.name,new Date()));
    this.forumS.onCreateFourm(forum);
 this.router.navigate(['/forum']);
  }



  goBack(){
    this.router.navigate(['/forum']);
}

}
