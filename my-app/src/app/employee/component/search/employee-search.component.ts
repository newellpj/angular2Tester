import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from '../../../../../node_modules/rxjs/Observable';
import { Subject }           from '../../../../../node_modules/rxjs/Subject';
import { EmployeeSearchService } from './employee-search.service';
import { Employee } from '../../employee';
@Component({
  moduleId: module.id,
  selector: 'employee-search',
  templateUrl: 'employee-search.component.html',
  styleUrls: [ 'employee-search.component.css' ],
  providers: [EmployeeSearchService]
})
export class EmployeeSearchComponent implements OnInit {

  employees: Observable<Employee[]>;

  private searchTerms = new Subject<string>(); //Subject is a producer of an observable event stream - Subject is also an Observable
  //Subject allows you to push an array of users keypresses to concatenate an array which forms a single search term

  constructor( private employeeSearchService: EmployeeSearchService,  private router: Router) {

  }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


// switchMap calls our search service for each search term that makes it through
// the debounce and distinctUntilChanged gauntlet. It cancels and discards previous
// search observables, returning only the latest search service observable.

  ngOnInit(): void {
    this.employees = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
        .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term ? this.employeeSearchService.search(term)  : Observable.of<Employee[]>([]))    // switch to new observable each time - return the http search observable
         // or the observable of empty employees if no search term
      .catch(error => {
          // TODO: real error handling
          console.log(error);
          return Observable.of<Employee[]>([]);
      });
  }

  gotoDetail(employee: Employee): void {
      let link = ['/detail', employee.id];
      this.router.navigate(link);
  }
}
