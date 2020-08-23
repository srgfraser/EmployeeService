import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Employee} from '../models/employee-model';
import { Observable } from 'rxjs';

@Injectable({   providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient) { }

  urlRootProd = 'https://employeeservice20200821173815.azurewebsites.net/api/employee/';
  urlRootDev = 'http://localhost:54065/api/employee/';

  urlRoot = this.urlRootProd;

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

  postData(employee: Employee): void {
    this.http.post<Employee>(this.urlRoot, employee)
             .subscribe(response => console.log(response));
  }

  putData(id: number, employee: Employee): void {
    this.http.put<Employee>(this.urlRoot + id, employee)
             .subscribe(response => console.log(response));
  }

  deleteData(id: number): void {
    this.http.delete<Employee>(this.urlRoot + id)
             .subscribe(response => console.log(response));
  }
}
