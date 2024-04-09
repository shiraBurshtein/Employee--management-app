import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { Employee} from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee-service.service';

@Component({
    selector: 'app-add-employee',
    standalone: true,
    templateUrl: './add-employee.component.html',
    styleUrl: './add-employee.component.css',
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
export class AddEmployeeComponent implements OnInit{ 
    public employee: Employee = {
    employeeId:null,
    firstName: "",
    lastName: "",
    identity:"",
    birthDate:null,
    positions: [],
    gender: null,
    entryDate:null
  };
  constructor( private _EmployeeService :EmployeeService , private _router :Router){ }

 

  ngOnInit(): void {

  }
  addEmployee(employee:Employee): void {
    console.log("afterall before service:",employee);

    this._EmployeeService.addEmployee(employee).subscribe({
      next: (res) => {
        console.log("afterall in add:",res);
        this._router.navigate(['employees']);
      },
      error: (err) => { console.error(err); }
    })
  }
}
