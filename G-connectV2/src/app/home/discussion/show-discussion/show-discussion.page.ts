import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Format } from 'src/app/models/Format.model';
import { ForumService } from 'src/app/services/forum.service';
import { ModerateService } from 'src/app/services/moderate.service';
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
completeAns: Format;
  deleteAnswerId: string;

  myform=new FormGroup({
    newanswer: new FormControl('')
  });
  constructor(private forumS: ForumService,private route: ActivatedRoute,
              private router: Router, private regS: RegUserService, private modS: ModerateService){}





    ngOnInit() {
      this.currentForumId=this.route.snapshot.params.id;

   this.currentQuestion=this.forumS.getCurrentForum(this.currentForumId);
   this.name=this.regS.cUser.name;
   this.forumS.fetchAnswers(true,this.currentForumId).subscribe(val =>{
     this.answers=val;
   });
    }
    ionViewWillEnter(){
      this.currentForumId=this.route.snapshot.params.id;
      this.name=this.regS.cUser.name;

    }

  createTextArea(){
    this.answer=true;
  }


  addAnswer(){
if (this.regS.moderator){
  this.completeAns=new Format(this.myform.value.newanswer,this.name,true,new Date());
  this.completeAns.qid=this.currentForumId;
  this.modS.verifyAnswers(this.completeAns);

}else{
  this.completeAns=new Format(this.myform.value.newanswer,this.name,false,new Date());
  this.forumS.onAddAswer(this.currentForumId,this.completeAns,this.currentQuestion.content);
}

     this.answer=!this.answer;
   this.myform.reset();


  }
  clear(){
    this.answer=!this.answer;
  }


}
