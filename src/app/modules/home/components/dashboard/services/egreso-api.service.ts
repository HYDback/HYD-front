import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EgresoApiConstant } from 'src/app/constants/apis/egreso-api.constant';

@Injectable({
  providedIn: 'root'
})
export class EgresoApiService {

  constructor(private http: HttpClient){}

  public saveEgresos(egresos: any): Observable<any>  {
    return this.http.post<any>(`${EgresoApiConstant.URL_EGRESOS}`, egresos)
  }

  public getEgresosByFilter(filter: any): Observable<any>  {
    return this.http.post<any>(`${EgresoApiConstant.URL_EGRESOS_FILTER}`, filter)
  }
}
