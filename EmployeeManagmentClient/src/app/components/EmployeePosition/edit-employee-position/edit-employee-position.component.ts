import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../models/employee.model';
import { EmployeePosition } from '../../../models/EmployeePosition.model';
import { EmployeePositionFormComponent } from "../employee-position-form/employee-position-form.component";

@Component({
  selector: 'app-edit-employee-position',
  standalone: true,
  templateUrl: './edit-employee-position.component.html',
  styleUrl: './edit-employee-position.component.css',
  imports: [EmployeePositionFormComponent]
})
export class EditEmployeePositionComponent implements OnInit {
  employee: Employee;
  employeePosition: EmployeePosition;
  constructor(
    public dialogRef: MatDialogRef<EditEmployeePositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, employeePosition: EmployeePosition }
  ) {
    this.employee = this.data.employee;
    this.employeePosition = this.data.employeePosition;
  }
  ngOnInit(): void {


  }
  editPosition(employeePosition: EmployeePosition) {
    for (let i = 0; i <= this.employee.positions.length-1; i++) {
      if (this.employee.positions[i].positionId === this.employeePosition.positionId)
        this.employee.positions[i] = employeePosition;
    }
    this.dialogRef.close(this.employee.positions);
  }
  
  onCancel(): void {
    this.dialogRef.close(this.employee.positions); // Close the dialog without saving
  }

}
