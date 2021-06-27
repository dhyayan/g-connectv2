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
  name: string;
  img='../../assets/empty-profile.png';
    constructor(private regS: RegUserService, private authS: AuthService, private route: ActivatedRoute) { }



    ngOnInit() {
      this.name= this.route.snapshot.params.name;
      console.log(this.name);
      this.regS.getUserByName(this.name).subscribe(cUser =>{
        this.cUser=cUser;
        if(cUser.uploadedImageUrl){
          this.img=cUser.uploadedImageUrl;

        }

      });



      }


}
