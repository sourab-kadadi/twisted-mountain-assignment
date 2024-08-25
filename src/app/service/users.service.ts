import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private server: HttpServerService) {} 

  getUsersList(): Observable<any> {
    return this.server.get('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json')
  }

}
