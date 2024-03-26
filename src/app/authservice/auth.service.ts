import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { 
    //this.isAdmin();
  }

  /** User admin or not **/
  // isAdmin(){
  //   let user = localStorage.getItem(JSON.parse('userInfo') || '');
  //   console.log(user);
  //   return true;
  // }
}
