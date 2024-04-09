import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
    selector: 'app-update-employee',
    standalone: true,
    templateUrl: './update-employee.component.html',
    styleUrl: './update-employee.component.css',
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatExpansionModule,
        EmployeeFormComponent
    ]
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId: number;
  public employee: Employee;
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.employeeId = Number(this._route.snapshot.paramMap.get('employeeId'));
    this._employeeService.getEmployeeById(this.employeeId)
    .subscribe({
      next: (res) => {
        this.employee = res;
      },
    })
    
  }



  updateEmployee(employee:Employee): void {
    console.log("inupdate: before servic",employee)
    this._employeeService.updateEmployee(employee,this.employeeId).subscribe({
      next: (res) => {
        console.log("res afterService:",res)
        this._router.navigate(['employees']);
      },
      error: (err) => { console.error(err); }
    })
  }
}
