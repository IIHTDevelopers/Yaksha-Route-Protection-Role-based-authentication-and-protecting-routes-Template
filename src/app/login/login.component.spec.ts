import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockAuthService {
  login = jest.fn();
  getUserRole = jest.fn();
}

class MockRouter {
  navigate = jest.fn();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    // Test case 1: Component should be created successfully
    it('should create the LoginComponent', () => {
      expect(component).toBeTruthy();
    });

    // Test case 2: onSubmit should call AuthService.login with correct credentials
    it('should call authService.login when onSubmit is called', () => {
      component.username = 'admin';
      component.password = 'admin123';

      authService.login.mockReturnValue(of([])); // Mocking successful login response

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith('admin', 'admin123');
    });

    // Test case 3: Should navigate to admin page if role is admin
    it('should navigate to /admin if the role is admin', () => {
      component.username = 'admin';
      component.password = 'admin123';

      authService.login.mockReturnValue(of([])); // Mocking successful login response
      authService.getUserRole.mockReturnValue('admin'); // Mocking the role as 'admin'

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    });

    // Test case 4: Should navigate to user page if role is user
    it('should navigate to /user if the role is user', () => {
      component.username = 'user';
      component.password = 'user123';

      authService.login.mockReturnValue(of([])); // Mocking successful login response
      authService.getUserRole.mockReturnValue('user'); // Mocking the role as 'user'

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/user']);
    });
  });
});
