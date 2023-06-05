import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user-model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  dataSource: User[] = [];
  constructor(private http: HttpClient) { }
  fetchData() {
    return this.http.get<User[]>('assets/data.json')
  }
}
