import { Component, EventEmitter, Inject, Input, OnInit, Output, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { EmployeePosition } from '../../../models/EmployeePosition.model';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/position-service.service';

@Component({
  providers: [PositionService, HttpClient, MatOption],
  selector: 'app-employee-position-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatNativeDateModule,

  ],
  templateUrl: './employee-position-form.component.html',
  styleUrl: './employee-position-form.component.css'
})
export class EmployeePositionFormComponent implements OnInit {
  positionForm: FormGroup;
  @Input() entryDateToWork :Date;
  @Input() employee: Employee;
  @Input() employeePosition: EmployeePosition;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  positions: Position[];
  constructor(
    private _positionService: PositionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this._positionService.getPositions().subscribe({
      next: (res: Position[]) => {
        this.positions = res;
      },
      error: (err) => {
        console.error(err);
      }
    });


    this.positionForm = this.formBuilder.group({
      positionName: [this.employeePosition.positionName, Validators.required],
      isManagement: [this.employeePosition.isManagement, Validators.required,Validators.maxLength(9),Validators.minLength(9)],
      entryDate: [this.employeePosition.entryDate, Validators.required]

    });
  }

  // dateValidator(control: FormControl) {
  //   // const selectedDate = control.value;
  //   // if (selectedDate < this.employee.entryDate) {
  //   //   return { invalidDate: true }; // החזרת אובייקט שמציין כי התאריך לא תקין
  //   // }
  //   return null; // החזרת ערך null כאשר התאריך תקין
  // }

  isPositionDisabled(PositionName: String) {
    for (let i = 0; i < this.employee.positions.length; i++) {
      if (this.employee.positions[i].positionName === PositionName && this.employee.positions[i].positionName != this.employeePosition.positionName) {
        return true;
      }
    }
    return false;

  }

  onSubmit() {

    for (let i = 0; i < this.positions.length; i++) {
      if (this.positions[i].positionName === this.positionForm.value.positionName) {
        this.employeePosition.positionId = this.positions[i].positionId;

      }
    }
    this.employeePosition.positionName = this.positionForm.value.positionName;
    this.employeePosition.entryDate = this.positionForm.value.entryDate;
    this.employeePosition.isManagement = this.positionForm.value.isManagement;


    this.submitEvent.emit(this.employeePosition as EmployeePosition);

  }


}
