import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryApiConstant } from 'src/app/constants/apis/categoria-api.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private http: HttpClient){}

  public saveCategoria(categoria: any): Observable<any>  {
    return this.http.post<any>(`${CategoryApiConstant.URL_CATEGORIES}`, categoria)
  }

  public updateCategoria(categoria: any): Observable<any>  {
    return this.http.put<any>(`${CategoryApiConstant.URL_CATEGORIES}`, categoria)
  }

  public getCategoriasByFilter(filter: string): Observable<any>  {
    return this.http.post<any>(`${CategoryApiConstant.URL_CATEGORIES_FILTER}`, filter)
  }


}
