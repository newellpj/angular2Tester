"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var employee_service_1 = require('../service/employee.service');
var EmployeeComponent = (function () {
    function EmployeeComponent(employeeService, router) {
        this.employeeService = employeeService;
        this.router = router;
    }
    EmployeeComponent.prototype.onSelect = function (employee) {
        this.selectedEmployee = employee;
    };
    EmployeeComponent.prototype.getEmployees = function () {
        var _this = this;
        this.employeeService.getEmployees().then(function (employees) { return _this.employees = employees; }); //this hero will be assigned the heroes array returned from the employeeService getEmployees
        // promise - async
        // in case data is not ready on demand the promise takes care of this asynchronously
    };
    EmployeeComponent.prototype.ngOnInit = function () {
        this.getEmployees();
    };
    EmployeeComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedEmployee.id]);
    };
    EmployeeComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return; //if name empty or undefined - return
        }
        this.employeeService.create(name)
            .then(function (employee) {
            _this.employees.push(employee); //pushes employee var onto employees array that is returned from employee service create call -
            //in addition to name it will have id created server side and returned in json object
            _this.selectedEmployee = null;
        });
    };
    EmployeeComponent.prototype.delete = function (employee) {
        var _this = this;
        this.employeeService.delete(employee.id)
            .then(function () {
            _this.employees = _this.employees.filter(function (e) { return e !== employee; });
            if (_this.selectedEmployee === employee) {
                _this.selectedEmployee = null;
            }
        });
    };
    EmployeeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employees',
            templateUrl: 'employee.component.html',
            styleUrls: ['employee.component.css'],
            providers: [employee_service_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService, router_1.Router])
    ], EmployeeComponent);
    return EmployeeComponent;
}());
exports.EmployeeComponent = EmployeeComponent;
//# sourceMappingURL=employee.component.js.map