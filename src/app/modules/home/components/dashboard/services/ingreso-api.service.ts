import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientApiConstant } from 'src/app/constants/apis/cliente-api.constant';
import { IngresoApiConstant } from 'src/app/constants/apis/ingreso-api.constant';

@Injectable({
  providedIn: 'root'
})
export class IngresoApiService {

  constructor(private http: HttpClient){}

  public saveIngresos(ingresos: any): Observable<any>  {
    return this.http.post<any>(`${IngresoApiConstant.URL_INGRESOS}`, ingresos)
  }

  public getIngresosByFilter(filter: string): Observable<any>  {
    return this.http.post<any>(`${IngresoApiConstant.URL_INGRESOS_FILTER}`, filter)
  }
}
