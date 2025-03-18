import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { AuthService } from '../auth.service';
import { By } from '@angular/platform-browser';

class MockAuthService {
  logout = jest.fn();
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    });

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    // Test case 1: Component should be created successfully
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    // Test case 2: The page should display the correct content for User
    it('should display "Only accessible by User users."', () => {
      const content = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(content.textContent).toBe('Only accessible by User users.');
    });

    // Test case 3: Logout button should call logout method from AuthService
    it('should call logout method from AuthService when logout button is clicked', () => {
      jest.spyOn(authService, 'logout'); // Spying on the logout method

      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();

      expect(authService.logout).toHaveBeenCalled(); // Verifying that logout was called
    });

    // Test case 4: Logout button should call AuthService.logout when clicked
    it('should call AuthService.logout method when logout button is clicked', () => {
      const logoutButton = fixture.debugElement.query(By.css('button')).nativeElement;
      logoutButton.click();

      expect(authService.logout).toHaveBeenCalled(); // Verifying that logout is called
    });
  });
});
