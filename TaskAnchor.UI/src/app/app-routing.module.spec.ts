import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { RegisterComponent } from "./register/register.component";

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
        TaskListComponent,
        RegisterComponent
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

  it('should define a register route that uses RegisterComponent', () => {
    const registerRoute = router.config.find(route => route.path === 'register');

    expect(registerRoute).toBeDefined();
    expect(registerRoute?.component).toBe(RegisterComponent);
  });
});
