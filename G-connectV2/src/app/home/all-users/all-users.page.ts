import { Component, OnInit } from '@angular/core';
import { RegUser } from 'src/app/models/reg-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegUserService } from 'src/app/services/reg-user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {

  ourUsers: RegUser[];
  isLoading= false;
  viewUser: RegUser[]=[];
  constructor(private regUserS: RegUserService, private authS: AuthService) { }

ngOnInit(){

  if(this.authS.currentUserEmail){
    this.isLoading=true;
    this.regUserS.loadAllUsers().subscribe( users =>{
      this.ourUsers=users;
      this.regUserS.allUsers=users;
      this.isLoading=false;
      this.removeCurrentUser(this.authS.currentUserEmail);
      this.onViewAll();


    });
}

}

onViewAlumni(role: string){
  this.viewUser=[];
  for(const al of this.ourUsers){
    if(al.role===role){
      this.viewUser.push(al);
    }
  }
}

onViewStudent(role: string){
  this.viewUser=[];
  for(const stu of this.ourUsers){
    if(stu.role===role){
      this.viewUser.push(stu);
    }
  }

}

onViewTeacher(role: string){
  this.viewUser=[];
  for(const tea of this.ourUsers){
    if(tea.role===role){
      this.viewUser.push(tea);
    }
  }
}

onViewAll(){
  this.viewUser=[];
  this.viewUser=this.ourUsers;

}

removeCurrentUser(email: string){

  this.ourUsers = this.ourUsers.filter(item => item.email !== email);

}


}

