import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getAllEmployee(): Observable<Employee[]> {  
    return this.http.get<Employee[]>(environment.apiURL + '/Employee');  
  }  
  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(environment.apiURL + '/Employee/' + employeeId);
  }
  createEmployee(employee: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Employee>(environment.apiURL + '/Employee/',  
    employee, httpOptions);  
  }  
  // updateEmployee(employee: Employee): Observable<Employee> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put<Employee>(environment.apiURL  + '/Employee/', employee, httpOptions);
  // }

  // deleteEmployeeById(employeeid: string): Observable<number> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.delete<number>(environment.apiURL + '/Employee?id=' + employeeid, httpOptions);
  // }
  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Employee>(environment.apiURL  + '/Employee/', employee, httpOptions);
  }
  
  deleteEmployeeById(employeeid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(environment.apiURL + '/Employee/' + employeeid, httpOptions);
  }
}
