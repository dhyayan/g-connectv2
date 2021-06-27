import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Format } from 'src/app/models/Format.model';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.page.html',
  styleUrls: ['./discussion.page.scss'],
})
export class DiscussionPage implements OnInit {

  questions: Format[];
  constructor(private router: Router, private forumS: ForumService) { }

  ngOnInit() {
this.forumS.fetchQuestion(true).subscribe(myforum =>{
  this.questions=myforum;
});
  }
  goToNewDiscussion(){
    this.router.navigate(['home/discussion/creatediscussion']);
  }
}
