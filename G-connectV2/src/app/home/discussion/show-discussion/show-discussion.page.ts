import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Format } from 'src/app/models/Format.model';
import { ForumService } from 'src/app/services/forum.service';
import { RegUserService } from 'src/app/services/reg-user.service';

@Component({
  selector: 'app-show-discussion',
  templateUrl: './show-discussion.page.html',
  styleUrls: ['./show-discussion.page.scss'],
})
export class ShowDiscussionPage implements OnInit {

  currentQuestion: Format;
  currentForumId: string;
  answer = false ;
  answers: Format[];
  name: string;

  deleteAnswerId: string;

  myform=new FormGroup({
    newanswer: new FormControl('')
  });
  constructor(private forumS: ForumService,private route: ActivatedRoute,
              private router: Router, private regS: RegUserService){}





    ngOnInit() {
    this.currentForumId=this.route.snapshot.params.id;

   this.currentQuestion=this.forumS.getCurrentForum(this.currentForumId);
   this.name=this.regS.cUser.name;
   this.forumS.fetchAnswers(true,this.currentForumId).subscribe(val =>{
     this.answers=val;
   });
    }

  createTextArea(){
    this.answer=true;
  }


  addAnswer(){

   const completeAns=new Format(this.myform.value.newanswer,this.name,new Date());
     this.answer=!this.answer;
   this.myform.reset();
   this.forumS.onAddAswer(this.currentForumId,completeAns,this.currentQuestion.content);

  }
  clear(){
    this.answer=!this.answer;
  }

  goBack(){
    this.router.navigate(['/forum']);
  }

}
