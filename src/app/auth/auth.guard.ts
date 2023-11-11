import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'
import { AuthApiService } from '../modules/login/services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const authApiService = inject(AuthApiService);
  if(!token){
    router.navigate(['login']);
    return false;
  }
  authApiService.verifyToken(token).subscribe({
    next: (data) => {
      sessionStorage.setItem('AUTH', JSON.stringify(data.Resp.data.decoded.dataUser))
    },
    error: (data) => {
      router.navigate(['login']);
      return false
    }
  })
  return true;
};

