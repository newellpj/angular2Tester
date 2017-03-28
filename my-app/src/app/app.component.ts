import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  styleUrls: [ 'app.component.css', 'dashboard.component.css' ],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/employees" routerLinkActive="active">Employees</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'HR Management system';
}
