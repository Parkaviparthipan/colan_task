import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    const user = localStorage.getItem('currentUser');

    if (user) {
      console.log(user);
      return true;
    } else {
      console.log(user, 'else');
      this.router.navigate(['/auth/login']);
      return false;
    }


  }

}
