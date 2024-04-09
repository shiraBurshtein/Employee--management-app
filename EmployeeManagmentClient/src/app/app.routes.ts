import { Routes } from '@angular/router';
import { EmployeeTableComponent } from '../app/components/Employees/employee-table/employee-table.component';
import { AddEmployeeComponent } from '../app/components/Employees/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from '../app/components/Employees/update-employee/update-employee.component';
import { HomePageComponent } from '../app/components/home-page/home-page.component';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: HomePageComponent},
    { path: "employees", component: EmployeeTableComponent},
    { path: "employees/add", component: AddEmployeeComponent},
    { path: "employees/:employeeId", component: UpdateEmployeeComponent},
    // { path: "employees/:employeeId/:PositionName", component: EmployeePositionDetailsComponent}


];
