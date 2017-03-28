import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; 
import { InMemoryDataService }  from './employee/service/in-memory-data.service';

import { AppComponent }        from './app.component';
import { EmployeeDetailComponent } from './employee/component/employee-detail.component';
import { EmployeeComponent }     from './employee/component/employee.component';
import { EmployeeSearchComponent }         from './employee/component/search/employee-search.component';
import { EmployeeService }         from './employee/service/employee.service';
import { DashboardComponent }  from './dashboard.component';

import { AppRoutingModule }     from './app-routing.module';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeComponent,
    DashboardComponent,
    EmployeeSearchComponent
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
