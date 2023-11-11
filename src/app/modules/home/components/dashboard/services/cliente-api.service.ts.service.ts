import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientApiConstant } from 'src/app/constants/apis/cliente-api.constant';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private http: HttpClient){}

  public saveCliente(cliente: any): Observable<any>  {
    return this.http.post<any>(`${ClientApiConstant.URL_CLIENTS}`, cliente)
  }

  public updateCliente(cliente: any): Observable<any>  {
    return this.http.put<any>(`${ClientApiConstant.URL_CLIENTS}`, cliente)
  }

  public getClientesByFilter(filter: string): Observable<any>  {
    return this.http.post<any>(`${ClientApiConstant.URL_CLIENTS_FILTER}`, filter)
  }
}
