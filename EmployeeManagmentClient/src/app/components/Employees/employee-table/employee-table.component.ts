import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee-service.service';



@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,

  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit {
  public EmployeesList: Employee[] = [];
  public EmployeesListFilter: Employee[] = [];
  public filterForm!: FormGroup;
  displayedColumns: string[] = ['firstName', 'lastName', 'identity', 'entryDate', 'edit'];



  constructor(
    private _EmployeeService: EmployeeService,
    private _router: Router,

  ) { }
  ngOnInit(): void {

    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
    });

    this.getemployees();


    this.subscribeTosearchTextChanges();
  }

  private subscribeTosearchTextChanges() {
    this.filterForm.valueChanges.subscribe(() => {
      this.filter();
    });
  }
  getemployees() {

    this._EmployeeService.getEmployees().subscribe({
      next: (res) => {
        this.EmployeesList = res;
        this.filter();
      },
      error: (err) => { console.error(err); }
    });
  }
  addEmployee() {
    this._router.navigate(['/employees/add']);
  }
  //  פונקציה לעריכת עובד
  editEmployee(employee: Employee): void {
    this._router.navigate(['/employees', employee.employeeId]);
  }

  // פונקציה למחיקת עובד
  deleteEmployee(employee: Employee): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAfterConfirm(employee)
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        );
      }
    });


  }
  deleteAfterConfirm(employee: Employee) {
    this._EmployeeService.deleteEmployee(employee.employeeId).subscribe({
      next: (res) => {
        this.getemployees();
        this.filter();
      },
      error: (err) => { console.error(err); }
    });

  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.EmployeesListFilter);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'Employees.xlsx');

    Swal.fire(
      '',
      'The file is downloading...',
      'success'
    );
  }
  filter() {
    this.EmployeesListFilter = this.EmployeesList.filter(employee =>
      employee.firstName.toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase()) ||
      employee.identity.toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase()) ||
      String(employee.entryDate).toLowerCase().includes(this.filterForm.controls['searchText'].value.toLowerCase())

    );
  }


}





