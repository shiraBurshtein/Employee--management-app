import { EmployeePosition } from "../models/EmployeePosition.model";

export class Employee {
    employeeId: number;
    firstName!: string;
    lastName!: string;
    identity!: string;
    birthDate !: Date;
    gender!: number;
    entryDate!: Date;
    positions!:EmployeePosition[];

   constructor(
    employeeId: number,
    firstName: string,
    lastName: string,
    identity: string,
    birthDate: Date,
    gender: number,
    entryDate: Date,
    isActive: boolean,

   ) {
     this.employeeId = employeeId;
     this.firstName = firstName;
     this.lastName = lastName;
     this.identity = identity;
     this.birthDate = birthDate;
     this.gender = gender;
     this.entryDate = entryDate;
   }
  }