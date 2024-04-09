
import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  constructor(private http: HttpClient) { }
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:7055/api/Employees')
  } 
  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7055/api/Employees/${id}`)
  }
  public addEmployee(employee:Employee): Observable<Employee> {
  
     return this.http.post<Employee>(`https://localhost:7055/api/Employees`,employee);

   
   }
   public updateEmployee(employee:Employee,id: number): Observable<Employee> {
    // debugger;
     return this.http.put<Employee>(`https://localhost:7055/api/Employees/${id}`,employee);
   
   }
   public deleteEmployee(id: number){
    // debugger;
     return this.http.delete(`https://localhost:7055/api/Employees/${id}`);
   
   }
}
