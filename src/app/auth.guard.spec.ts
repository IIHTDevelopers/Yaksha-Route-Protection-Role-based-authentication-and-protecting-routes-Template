import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

class MockAuthService {
  isAuthenticated = jest.fn();
  getUserRole = jest.fn();
}

class MockRouter {
  navigate = jest.fn();
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  describe('business', () => {
    // Test case 1: Should return true if the user is authenticated and has the correct role
    it('should allow access if user is authenticated and has the expected role', () => {
      authService.isAuthenticated.mockReturnValue(true);
      authService.getUserRole.mockReturnValue('admin');

      const next = { data: { role: 'admin' } } as any;
      const state = {} as any;

      const result = authGuard.canActivate(next, state);

      expect(result).toBe(true); // Access should be allowed
    });

    // Test case 2: Should redirect to login if user is authenticated but does not have the correct role
    it('should redirect to login if user is authenticated but does not have the expected role', () => {
      authService.isAuthenticated.mockReturnValue(true);
      authService.getUserRole.mockReturnValue('user');  // User role instead of expected 'admin'

      const next = { data: { role: 'admin' } } as any;
      const state = {} as any;

      const result = authGuard.canActivate(next, state);

      expect(result).toBe(false);  // Access should be denied
      expect(router.navigate).toHaveBeenCalledWith(['/login']); // Should redirect to login
    });

    // Test case 3: Should redirect to login if user is not authenticated
    it('should redirect to login if user is not authenticated', () => {
      authService.isAuthenticated.mockReturnValue(false); // User is not authenticated
      const next = { data: { role: 'admin' } } as any;
      const state = {} as any;

      const result = authGuard.canActivate(next, state);

      expect(result).toBe(false); // Access should be denied
      expect(router.navigate).toHaveBeenCalledWith(['/login']); // Should redirect to login
    });
  });
});
