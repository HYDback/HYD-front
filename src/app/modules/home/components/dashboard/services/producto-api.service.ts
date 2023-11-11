import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductApiConstant } from 'src/app/constants/apis/producto-api.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient){}

  public saveProducto(producto: any): Observable<any>  {
    return this.http.post<any>(`${ProductApiConstant.URL_PRODUCTS}`, producto)
  }

  public updateProducto(producto: any): Observable<any>  {
    return this.http.put<any>(`${ProductApiConstant.URL_PRODUCTS}`, producto)
  }

  public getProductosByFilter(filter: any): Observable<any>  {
    return this.http.post<any>(`${ProductApiConstant.URL_PRODUCTS_FILTER}`, filter)
  }


}
