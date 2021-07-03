import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { last, concatMap } from 'rxjs/operators';
import { RegUser } from 'src/app/models/reg-user.model';
import { RegUserService } from 'src/app/services/reg-user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
error: string;
newEmail='';
show= false;
cUser: RegUser;
uploadCompletion$: Observable<number>;
  downloadUrl$: Observable<string>;
  img='../../../assets/empty-profile.png';
constructor(private  storage: AngularFireStorage, private regS: RegUserService, private authS: AuthService) { }
 ngOnInit() {
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
 saveUrl$.subscribe(console.log);

      }

showInput(){
  this.show=!this.show;
}
changeEmail(email: string){
  this.authS.afAuth.user.subscribe(val =>{
    val.updateEmail(email).then(() =>{
    this.error='Your password has been sucessfully changed ';
    }).catch(error => {
      this.error=error;
      console.log(error);
    }
      );
  });
}
removeError(){
  this.error=null;
}
}
