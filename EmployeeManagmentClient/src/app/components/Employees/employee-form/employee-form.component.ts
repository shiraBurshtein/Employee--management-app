import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import { Position } from '../../../models/position.model';
import { AddPositionToEmployeeComponent } from '../../EmployeePosition/add-position-to-employee/add-position-to-employee.component';
import { EmployeePositionDetailsComponent } from '../../EmployeePosition/employee-position-details/employee-position-details.component';
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
// import {Swal} from 'sweetalert2';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
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
    EmployeePositionDetailsComponent
  ]
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  positionsFormArray!: FormArray;
  positions: Position[] = [];
  genders = [{ value: 0, viewValue: 'Male' }, { value: 1, viewValue: 'Female' }];
  @Input() employee: Employee;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      identity: [this.employee.identity, Validators.required],
      birthDate: [this.employee.birthDate, Validators.required],
      gender: [this.employee.gender, Validators.required],
      entryDate: [this.employee.entryDate, Validators.required],
    });
  }
  isFormValid() {
    return !this.employeeForm.valid;
  }

  openAddPositionDialog(): void {


    if (!this.employeeForm.valid) {
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: 'You will not be able to recover this data!',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes, delete it!',
      //   cancelButtonText: 'Cancel',
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     // Perform your action here if confirmed
      //     Swal.fire(
      //       'Deleted!',
      //       'Your data has been deleted.',
      //       'success'
      //     );
      //   }
      // });
    }
    const dialogRef = this.dialog.open(AddPositionToEmployeeComponent, {
      width: '500px',
      data: { employee: this.employee } // נתונים שתעבירי לדיאלוג, אם ישנם
    });

    dialogRef.afterClosed().subscribe(result => {
      this.employee.positions = result;
      console.log("after add in big form ", this.employee)

    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employee.firstName = this.employeeForm.value.firstName;
      this.employee.lastName = this.employeeForm.value.lastName;
      this.employee.identity = this.employeeForm.value.identity;
      this.employee.birthDate = this.employeeForm.value.birthDate;
      this.employee.gender = this.employeeForm.value.gender;
      this.employee.entryDate = this.employeeForm.value.entryDate;

      console.log("after submit in form : ", this.employee);
      this.submitEvent.emit(this.employee);
    }
  }

  onCancel(): void {
    this.router.navigate(["/employees"]);
    console.log("canc")
  }
}


