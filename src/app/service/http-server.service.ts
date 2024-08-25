import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  constructor(private http: HttpClient ) {}

  get(url: string, option?: any): Observable<any> {
    return this.http.get(url, option)
  }


}
