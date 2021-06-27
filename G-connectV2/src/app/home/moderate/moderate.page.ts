import { Component, OnInit } from '@angular/core';
import { Format } from 'src/app/models/Format.model';
import { ForumService } from 'src/app/services/forum.service';
import { ModerateService } from 'src/app/services/moderate.service';

@Component({
  selector: 'app-moderate',
  templateUrl: './moderate.page.html',
  styleUrls: ['./moderate.page.scss'],
})
export class ModeratePage implements OnInit {

  posts: Format[];
answers: Format[];
post=false;
ans=false;
  constructor(private moderateS: ModerateService,private forumS: ForumService) { }

  ngOnInit() {
    this.moderateS.fetchData(false).subscribe(data =>{
      this.posts=data;
      if(this.posts.length===0){
        this.post=false;
      }
      else{
        this.post=true;
      }
      console.log(this.posts);
    });
    this.moderateS.fetchAnswers(false).subscribe(data =>{
      this.answers=data;
      if(this.answers.length===0){
        this.ans=false;
      }
      else{
        this.ans=true;
      }
      console.log(this.answers);
    });

  }
onVerifyQ(question: Format){
question.isModerated=true;
this.moderateS.verifyQuestion(question.id,{isModerated:question.isModerated});
}

onVerifyA(answer: Format ){
  answer.isModerated=true;
  this.moderateS.verifyAnswers(answer);
  console.log(answer.id);
  this.moderateS.onDeleteAnswer(answer.id);
}
}
