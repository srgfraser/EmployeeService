import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Employee} from '../models/employee-model';
import { Observable } from 'rxjs';

@Injectable({   providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient) { }

  urlRoot = 'https://employeeservice20200821173815.azurewebsites.net/api/employee/';

  httpOptions = {
    headers: new  HttpHeaders ({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlRoot, this.httpOptions);
  }

  getIdData(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.urlRoot + id);
  }

  postData(employee: Employee): Observable<any> {
    return this.http.post<Employee>(this.urlRoot, employee);
  }

  putData(id: number, employee: Employee): Observable<any> {
    return this.http.put<Employee>(this.urlRoot + id, employee);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<Employee>(this.urlRoot + id);
  }
}
