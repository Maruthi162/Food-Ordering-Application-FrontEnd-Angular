import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../Services-Folder/auth-service.service';
import { inject } from '@angular/core';


interface RouteData{
  requiredRole:string;
}
export const authGaurdGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state) => {
  const authService=inject(AuthServiceService);
  const router=inject(Router);

  const data= route.data as RouteData;
  const requiredRole=data.requiredRole;

  if(!authService.isLoggedIn()){
    router.navigate(['/login',state.url]);
    return false;
  }

  const role=authService.getUserRole();
  if(requiredRole && role!==requiredRole){
    router.navigate(['/forbidden']);
    return false;
  }
  return true;
};
