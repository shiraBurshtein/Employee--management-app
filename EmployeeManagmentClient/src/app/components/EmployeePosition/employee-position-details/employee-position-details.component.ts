import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EmployeePosition } from '../../../models/EmployeePosition.model';
import { PositionService } from '../../../services/position-service.service';
import { Position } from '../../../models/position.model';
import { EditEmployeePositionComponent } from '../edit-employee-position/edit-employee-position.component';
import { Employee } from '../../../models/employee.model';


@Component({
  selector: 'app-employee-position-details',
  standalone: true,
  imports: [    
     MatCardModule,
    MatIconModule,
    DatePipe,
    CommonModule
],
  templateUrl: './employee-position-details.component.html',
  styleUrl: './employee-position-details.component.css'
})
export class EmployeePositionDetailsComponent implements OnInit {
  role: string = 'Software Engineer';
  startDate: Date = new Date('2022-01-01'); 
  @Input() employeePosition : EmployeePosition;
  @Input() employee:Employee;
  isManagementRole: boolean = false;
  positions:Position[];
  constructor(private _positionsService :PositionService,private dialog: MatDialog,){

  }

  ngOnInit(): void {
     this._positionsService.getPositions().subscribe({
      next: (res) => {
        this.positions = res;
        this.employeePosition.positionName = this.positions.find(p => p.positionId === this.employeePosition.positionId).positionName;
      },
      error: (err) => {
        console.error(err);
      }
    })   
  }

  editEmployeePosition(){
    const dialogRef = this.dialog.open(EditEmployeePositionComponent, {
      width: '500px',
      data: {  employee: this.employee , employeePosition :this.employeePosition} // נתונים שתעבירי לדיאלוג, אם ישנם
    });

    dialogRef.afterClosed().subscribe(result => {
      this.employee.positions=result;
    });

  }
}
