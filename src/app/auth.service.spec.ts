import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('business', () => {
    // Test case 3: isAuthenticated should return true if user is logged in
    it('should return true if user is authenticated', () => {
      const mockUser = { id: 1, username: 'admin', password: 'admin123', role: 'admin' };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const result = service.isAuthenticated();

      expect(result).toBe(true);
    });

    // Test case 4: isAuthenticated should return false if no user is logged in
    it('should return false if no user is authenticated', () => {
      localStorage.removeItem('user');

      const result = service.isAuthenticated();

      expect(result).toBe(false);
    });

    // Test case 5: getUserRole should return the role of the user
    it('should return the role of the authenticated user', () => {
      const mockUser = { id: 1, username: 'admin', password: 'admin123', role: 'admin' };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const result = service.getUserRole();

      expect(result).toBe('admin');
    });

    // Test case 6: getUserRole should return undefined if no user is logged in
    it('should return undefined if no user is authenticated', () => {
      localStorage.removeItem('user');

      const result = service.getUserRole();

      expect(result).toBeUndefined();
    });
  });
});
