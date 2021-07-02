import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RegUser } from 'src/app/models/reg-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegUserService } from 'src/app/services/reg-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: Observable< RegUser>;
  cUser: RegUser;
  email: string;
  img='../../assets/empty-profile.png';
    constructor(private regS: RegUserService, private authS: AuthService, private route: ActivatedRoute) { }



    ngOnInit() {
      this.email= this.route.snapshot.params.email;
      console.log(this.email);
      this.cUser=this.regS.filterUserByEmail(this.email);
        if(this.cUser.uploadedImageUrl){
          this.img=this.cUser.uploadedImageUrl;

        }

      }



      }



