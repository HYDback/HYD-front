import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperadorApiConstant } from 'src/app/constants/apis/operador-api.constant';

@Injectable({
  providedIn: 'root'
})
export class OperadorApiService {

  constructor(private http: HttpClient){}

  public saveOperador(operador: any): Observable<any>  {
    return this.http.post<any>(`${OperadorApiConstant.URL_OPERADORES}`, operador)
  }

  public updateOperador(operador: any): Observable<any>  {
    return this.http.put<any>(`${OperadorApiConstant.URL_OPERADORES}`, operador)
  }

  public getOperadoresByFilter(filter: string): Observable<any>  {
    return this.http.post<any>(`${OperadorApiConstant.URL_OPERADORES_FILTER}`, filter)
  }
}
