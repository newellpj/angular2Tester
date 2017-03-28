

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import '../../../../node_modules/rxjs/add/operator/toPromise';
import { Employee } from '../employee';


@Injectable()
export class EmployeeService {


    private employeesUrl = 'api/employees';  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }


    create(name: string): Promise<Employee> {

      return this.http
        .post(this.employeesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
                .then(res => res.json().data)
                    .catch(this.handleError);
    }


    update(employee: Employee): Promise<Employee> {
      const url = `${this.employeesUrl}/${employee.id}`; //the employees details page for the specific employee

        return this.http
          .put(url, JSON.stringify(employee), {headers: this.headers})  // puts (saves) the updated info to the employee data object on the server
                                                                        //and then returns to calling function in employee-detail.component.ts which will invoke go back function
            .toPromise().then(() => employee)
                .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.employeesUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
            .then(() => null)
                .catch(this.handleError);
    }



    getEmployees(): Promise<Employee[]> {
      return this.http.get(this.employeesUrl)
                 .toPromise()
                 .then(response => response.json().data as Employee[])
                 .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }


    getEmployee(id: number): Promise<Employee> {
      return this.getEmployees()
                 .then(employees => employees.find(employee => employee.id === id));
    }


      getEmployeesSlowly(): Promise<Employee[]> {
        return new Promise<Employee[]>(resolve =>
          setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getEmployees());
      }



}
