import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { last, concatMap } from 'rxjs/operators';
import { RegUser } from 'src/app/models/reg-user.model';
import { RegUserService } from 'src/app/services/reg-user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { Format } from 'src/app/models/Format.model';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage{
error: string;
addStatus=false;
newEmail='';
show= false;
cUser: RegUser;
uploadCompletion$: Observable<number>;
  downloadUrl$: Observable<string>;
  status='';
  img='../../../assets/empty-profile.png';
constructor(private  storage: AngularFireStorage, private regS: RegUserService, private authS: AuthService) { }
 ionViewWillEnter() {
  this.cUser=this.regS.cUser;


  if(this.cUser.uploadedImageUrl){
    this.img=this.cUser.uploadedImageUrl;
  }

 }


    uploadFile(event){
      const file=event.target.files[0];
      const filePath=`Users/${this.cUser.id}/profilePic`;
      const task= this.storage.upload(filePath,file);


      this.downloadUrl$=task.snapshotChanges()
      .pipe(last(),concatMap(() => this.storage.ref(filePath)
      .getDownloadURL()));

     const saveUrl$=this.downloadUrl$
      .pipe(concatMap (url=> this.regS.updateUserDetail(this.cUser.id,{uploadedImageUrl:url})
       ));
 saveUrl$.subscribe(()=>{
    this.cUser=this.regS.cUser;
  if(this.cUser.uploadedImageUrl){
    this.img=this.cUser.uploadedImageUrl;
  }
 });

      }

showInput(){
  this.show=!this.show;
}
changeEmail(email: string){
  this.authS.afAuth.user.subscribe(val =>{
    val.updateEmail(email).then(() =>{

    this.error='Your email has been sucessfully changed ';
    const uemail=email.toLowerCase();
    this.regS.updateUserDetail(this.cUser.id,{email:uemail}).subscribe(()=>{
      this.cUser=this.regS.cUser;
      this.authS.logOut();
    });
    }).catch(error => {
      this.error=error;
     return;
    }
      );
  });
  this.show=!this.show;

  this.newEmail='';
}

removeError(){
  this.error=null;
}
onAddStatus(status: string){

this.regS.updateUserDetail(this.cUser.id,{status}).subscribe(()=>this.cUser=this.regS.cUser);
this.status='';
this.addStatus=false;


}
showStatus(){
  this.addStatus=true;
}
cancel(){
  this.status='';
  this.addStatus=false;
}
}
