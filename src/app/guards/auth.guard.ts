import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authservice/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  /** If we use service we need to use DI **/
  //let adminService = inject(AuthService);
  let ro = inject(Router);
  //let user = localStorage.getItem(JSON.parse('userInfo') || '');
  //let user = JSON.parse(localStorage.getItem('userInfo') || '');
  //console.log(user);
  let role = localStorage.getItem('role');
  console.log(role);
  if(role == 'admin'){
    /** Redirect to admin **/
    //ro.navigateByUrl('/admin');
    return true;
  }
  else if(role == 'regular'){
    alert("You have no Permission");
    ro.navigateByUrl('/login');
}
    alert("You have no Permission");
    ro.navigateByUrl('/login');
    return false;
  
};
