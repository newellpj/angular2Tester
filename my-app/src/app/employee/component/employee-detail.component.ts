import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import '../../../../node_modules/rxjs/add/operator/switchMap';

import { Employee } from '../employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  moduleId: module.id,
  selector: 'my-employee-detail',
  templateUrl: 'employee-detail.component.html',
  styleUrls: ['employee-detail.component.css']
})

export class EmployeeDetailComponent {


constructor(  private employeeService: EmployeeService,  private route: ActivatedRoute,  private location: Location) {

}

   @Input()
  employee: Employee;


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.employeeService.getEmployee(+params['id']))
      .subscribe(employee => this.employee = employee);
  }

  save(): void {
      this.employeeService.update(this.employee).then(() => this.goBack());
  }


  goBack(): void {
      this.location.back();
  }

}
