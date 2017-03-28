import { Component, OnInit } from '@angular/core';
import { Employee } from './employee/employee';
import { EmployeeService } from './employee/service/employee.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees()
      .then(employees => this.employees = employees.slice(1, 5)); //returns employees at index 1,2,3,4 in 0 based array - slice method is endian exclusive
  }
}
