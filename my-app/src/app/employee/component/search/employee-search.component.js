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
var Observable_1 = require('../../../../node_modules/rxjs/Observable');
var Subject_1 = require('../../../../node_modules/rxjs/Subject');
var employee_search_service_1 = require('./employee-search.service');
var EmployeeSearchComponent = (function () {
    //Subject allows you to push an array of users keypresses to concatenate an array which forms a single search term
    function EmployeeSearchComponent(employeeSearchService, router) {
        this.employeeSearchService = employeeSearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject(); //Subject is a producer of an observable event stream - Subject is also an Observable
    }
    // Push a search term into the observable stream.
    EmployeeSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    // switchMap calls our search service for each search term that makes it through
    // the debounce and distinctUntilChanged gauntlet. It cancels and discards previous
    // search observables, returning only the latest search service observable.
    EmployeeSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employees = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term ? _this.employeeSearchService.search(term) : Observable_1.Observable.of([]); }) // switch to new observable each time - return the http search observable
            .catch(function (error) {
            // TODO: real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    EmployeeSearchComponent.prototype.gotoDetail = function (employee) {
        var link = ['/detail', employee.id];
        this.router.navigate(link);
    };
    EmployeeSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'employee-search',
            templateUrl: 'employee-search.component.html',
            styleUrls: ['employee-search.component.css'],
            providers: [employee_search_service_1.EmployeeSearchService]
        }), 
        __metadata('design:paramtypes', [employee_search_service_1.EmployeeSearchService, router_1.Router])
    ], EmployeeSearchComponent);
    return EmployeeSearchComponent;
}());
exports.EmployeeSearchComponent = EmployeeSearchComponent;
//# sourceMappingURL=employee-search.component.js.map