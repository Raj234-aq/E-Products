import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private api_url = 'https://e-products.glitch.me/users';

  /** User Signup **/
  usersignup(signupdata:any){
    return this.http.post(`${this.api_url}/signup`, signupdata);
  }


  /** User Login **/
  userLogin(logindata:any){
    return this.http.post(`${this.api_url}/signin`, logindata);
  }
}
