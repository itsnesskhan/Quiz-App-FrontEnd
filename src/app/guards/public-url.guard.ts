import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servies/login.service';

@Injectable({
  providedIn: 'root'
})
export class PublicUrlGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn() && this.loginService.getUserRole()=='ADMIN'){
      this.router.navigate(['admin'])
      return false;
    }
    else if(this.loginService.isLoggedIn() && this.loginService.getUserRole()=='STUDENT'){
      this.router.navigate(['student-dashbored'])
    }
    return true;
  }
  
}
