import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmp } from './employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:8080/api/v1/employees';
  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Array<IEmp>> {
    return this.http.get<Array<IEmp>>(this.url);
  }

  postEmployee(employee: IEmp): Observable<IEmp> {
    return this.http.post<IEmp>(this.url, employee)
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }
  updateEmployee(employee: IEmp): Observable<IEmp> {
    return this.http.put<IEmp>(`${this.url}/${employee.id}`, employee);
  }
}
