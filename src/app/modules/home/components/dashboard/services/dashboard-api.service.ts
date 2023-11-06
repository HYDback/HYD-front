import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(private http: HttpClient){}

  public getParams(obj: any): any {
    let params: { [key: string]: any } = {};
    let keys = Object.keys(obj);
    for (let index = 0; index < keys.length; index++) {
      const element: string = keys[index];
      if (obj[element] != null && obj[element] !="") {
        params[element] = obj[element];
      }
    }
    return params;
  }

}
