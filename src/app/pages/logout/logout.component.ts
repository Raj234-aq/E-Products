import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  activeUser : any = '';
  isButton : boolean = false;
  constructor(private route : Router){

  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /** Get user info**/
  getUserInfo(){
    let user = JSON.parse(localStorage.getItem('userInfo') || '[]');
    console.log(user);
    this.activeUser = user.email;
    console.log(this.activeUser);
    if(this.activeUser != undefined){
    this.isButton = true;
    }
    this.isButton = false;
  }

  /** Logout Fun **/
  logout(){
    localStorage.clear();
    alert('You have successfully Logout');
    this.route.navigateByUrl('/login');
  }
}
