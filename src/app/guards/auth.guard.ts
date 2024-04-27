import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginServiceService } from '../services/loginService.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(LoginServiceService);
  
  return new Promise<boolean>(resolve => {
    auth.getAuth().onAuthStateChanged(user => {
      if(!user) {
        router.navigate(['/login']);
      } 
      
      resolve(user ? true : false);
    })
  })
}
