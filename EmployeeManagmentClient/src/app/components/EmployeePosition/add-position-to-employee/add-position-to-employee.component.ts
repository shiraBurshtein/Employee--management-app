import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../models/employee.model';
import { EmployeePositionFormComponent } from '../employee-position-form/employee-position-form.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeePosition } from '../../../models/EmployeePosition.model';


@Component({
  // providers:[HttpHandler],
    selector: 'app-add-position-to-employee',
    standalone: true,
    templateUrl: './add-position-to-employee.component.html',
    styleUrl: './add-position-to-employee.component.css',
    imports: [EmployeePositionFormComponent, HttpClientModule ]
})
export class AddPositionToEmployeeComponent implements OnInit{
  public employee:Employee; 
  public employeePosition: EmployeePosition = {
  positionId:0,
  positionName:null,
  isManagement:false,
  entryDate:null
  };
constructor(
  public dialogRef: MatDialogRef<AddPositionToEmployeeComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
){
  this.employee=this.data.employee;
}
  ngOnInit(): void {
  
   
  }
  addPosition(employeePosition: EmployeePosition) {
   this.employee.positions.push(employeePosition);
   console.log("in add : " , employeePosition)
    this.dialogRef.close(this.employee.positions);

  }
  onCancel(): void {
    this.dialogRef.close(this.employee.positions); // Close the dialog without saving
  }

}
