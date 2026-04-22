import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { TaskListComponent } from "./task-list/task-list.component";

describe('AppRoutingModule', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        TaskListComponent
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should define a tasks route that uses TaskListComponent', () => {
    const taskRoute = router.config.find(route => route.path === 'tasks');

    expect(taskRoute).toBeDefined();
    expect(taskRoute?.component).toBe(TaskListComponent);
  });

  it('should define the default route to use LoginComponent', () => {
    const defaultRoute = router.config.find(route => route.path === '');

    expect(defaultRoute).toBeDefined();
    expect(defaultRoute?.component).toBe(LoginComponent);
  });
});
