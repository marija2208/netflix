import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.userService.getCurrentUser();
    
    if (currentUser) {
      return true;
    }
    
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}