import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mySignup: FormGroup;
  myLogin: any = {'email': '', 'pass1': ''};

  constructor(private fBuilder:FormBuilder, private uService:UserService, private route : Router) {
    this.mySignup=this.fBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      phone: [""],
      avatar: [],
      pass1: [""],
    })
  }

  /** setFile($event) **/
  setFile(Event:any){
    let file = Event.target.files[0];
    console.log(file);
    /** Set file into this file **/
    this.mySignup.get("avatar")?.setValue(file);
  }
  signup(){
    // if(this.mySignup.value.valid){
    console.log(this.mySignup.value)

    /** Create a Object of FormData **/
    let userData = new FormData();
    let signupForm = this.mySignup.value;
    Object.keys(signupForm).forEach((em:any)=>{
      console.log(em, signupForm[em]);
      userData.append(em, signupForm[em]);
    });

    /** Now calling API **/
    this.uService.usersignup(userData).subscribe({
      next: ((res:any)=> {
        console.log(res);
      }),
      error:((error)=> {
        console.log(error);
      }),
    })

    // }
    // else{
    //   alert("Form not valid");
    // }
  }

  /** Login User **/
  login(){
    console.log(this.myLogin);
    this.uService.userLogin(this.myLogin).subscribe({
      next:((res:any)=> {
        console.log(res);
        /** User info into the local storage **/
        let info = {
          token: res.token.key,
          token_type: res.token.type,
          user_id: res.userInfo._id,
          email: res.userInfo.email,
          role : res.userInfo.role
        };
        //console.log(info);
        localStorage.setItem('role', res.userInfo.role);
        localStorage.setItem('userInfo', JSON.stringify(info));
        alert(res.message);
        if(res.userInfo.role == 'admin'){
          /** Redirect to admin route **/
          this.route.navigateByUrl('/admin');
        }
        else if(res.userInfo.role == 'regular'){
          /** Redirect to Product Page **/
        this.route.navigateByUrl('/products');
        }
        else{
          this.route.navigateByUrl('/login');
        }
        
      }),
      error:((error:any)=>{
        console.log(error);
      }),
    });
  }
}
