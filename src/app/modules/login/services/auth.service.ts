import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApiConstant } from 'src/app/constants/apis/auth-api.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient){}

  public login(loginForm: any): Observable<any>  {
    return this.http.post<any>(`${AuthApiConstant.URL_SIGNIN}`, loginForm)
  }

  public verifyToken(token: string): Observable<any>  {
    return this.http.post<any>(`${AuthApiConstant.URL_VERIFY_TOKEN}`, {token})
  }

  logout() {
    sessionStorage.removeItem('token');
  }

}
