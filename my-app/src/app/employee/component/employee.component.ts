import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';

import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeService } from '../service/employee.service';


@Component({
 moduleId: module.id,
 selector: 'my-employees',
 templateUrl: 'employee.component.html',
 styleUrls: ['employee.component.css'],
 providers: [EmployeeService]


})
export class EmployeeComponent  implements OnInit{

   selectedEmployee : Employee;

   employees : Employee[];

   constructor(private employeeService: EmployeeService,   private router: Router)   { }

   onSelect(employee: Employee): void {
      this.selectedEmployee = employee;
   }

   getEmployees(): void {
     this.employeeService.getEmployees().then(employees => this.employees = employees); //this hero will be assigned the heroes array returned from the employeeService getEmployees
                                                                           // promise - async
                                                                       // in case data is not ready on demand the promise takes care of this asynchronously
   }


   ngOnInit(): void {
      this.getEmployees();
    }

   gotoDetail(): void {
      this.router.navigate(['/detail', this.selectedEmployee.id]);
   }

   add(name: string): void {
      name = name.trim();

      if (!name) {
        return;   //if name empty or undefined - return
      }

      this.employeeService.create(name)
        .then(employee => {
            this.employees.push(employee); //pushes employee var onto employees array that is returned from employee service create call -
                                           //in addition to name it will have id created server side and returned in json object
            this.selectedEmployee = null;
        });
    }

    delete(employee: Employee): void {
        this.employeeService.delete(employee.id)
                .then(() => {
                      this.employees = this.employees.filter(e => e !== employee);
              if (this.selectedEmployee === employee) {
                  this.selectedEmployee = null;
              }

        });
    }



}
