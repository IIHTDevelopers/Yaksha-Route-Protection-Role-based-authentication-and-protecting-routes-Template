import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

class MockAuthService {
    isAuthenticated = jest.fn();
    getUserRole = jest.fn();
    logout = jest.fn();
}

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let authService: MockAuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterModule.forRoot([])], // Use RouterModule for routing
            providers: [{ provide: AuthService, useClass: MockAuthService }],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService) as unknown as MockAuthService; // Type casting
        fixture.detectChanges();
    });

    describe('boundary', () => {
        // Test case 1: Component should be created successfully
        it('should create the app component', () => {
            expect(component).toBeTruthy();
        });

        // Test case 2: Login link should be visible when user is not authenticated
        it('should show login link when user is not authenticated', () => {
            authService.isAuthenticated.mockReturnValue(false);
            fixture.detectChanges();

            const loginLink = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
            expect(loginLink).toBeTruthy(); // Check that the login link exists
        });

        // Test case 3: Admin link should not be visible when user is not authenticated
        it('should hide admin link when user is not authenticated', () => {
            authService.isAuthenticated.mockReturnValue(false);
            fixture.detectChanges();

            const adminLink = fixture.debugElement.query(By.css('a[routerLink="/admin"]'));
            expect(adminLink).toBeNull(); // Admin link should not be visible
        });

        // Test case 4: User link should not be visible when user is not authenticated
        it('should hide user link when user is not authenticated', () => {
            authService.isAuthenticated.mockReturnValue(false);
            fixture.detectChanges();

            const userLink = fixture.debugElement.query(By.css('a[routerLink="/user"]'));
            expect(userLink).toBeNull(); // User link should not be visible
        });

        // Test case 5: Show admin link when user is authenticated as admin
        it('should show admin link when user is authenticated as admin', () => {
            authService.isAuthenticated.mockReturnValue(true);
            authService.getUserRole.mockReturnValue('admin');
            fixture.detectChanges();

            const adminLink = fixture.debugElement.query(By.css('a[routerLink="/admin"]'));
            expect(adminLink).toBeTruthy(); // Admin link should be visible
        });

        // Test case 6: Hide user link when user is authenticated as admin
        it('should hide user link when user is authenticated as admin', () => {
            authService.isAuthenticated.mockReturnValue(true);
            authService.getUserRole.mockReturnValue('admin');
            fixture.detectChanges();

            const userLink = fixture.debugElement.query(By.css('a[routerLink="/user"]'));
            expect(userLink).toBeNull(); // User link should not be visible for admin
        });

        // Test case 7: Show user link when user is authenticated as user
        it('should show user link when user is authenticated as user', () => {
            authService.isAuthenticated.mockReturnValue(true);
            authService.getUserRole.mockReturnValue('user');
            fixture.detectChanges();

            const userLink = fixture.debugElement.query(By.css('a[routerLink="/user"]'));
            expect(userLink).toBeTruthy(); // User link should be visible
        });

        // Test case 8: Hide admin link when user is authenticated as user
        it('should hide admin link when user is authenticated as user', () => {
            authService.isAuthenticated.mockReturnValue(true);
            authService.getUserRole.mockReturnValue('user');
            fixture.detectChanges();

            const adminLink = fixture.debugElement.query(By.css('a[routerLink="/admin"]'));
            expect(adminLink).toBeNull(); // Admin link should not be visible for user
        });

        // Test case 9: Logout button should be visible when user is authenticated
        it('should show logout button when user is authenticated', () => {
            authService.isAuthenticated.mockReturnValue(true);
            fixture.detectChanges();

            const logoutButton = fixture.debugElement.query(By.css('button'));
            expect(logoutButton).toBeTruthy(); // Logout button should be visible
        });

        // Test case 10: Logout should be called when logout button is clicked
        it('should call logout method when logout button is clicked', () => {
            authService.isAuthenticated.mockReturnValue(true);
            fixture.detectChanges();

            const logoutButton = fixture.debugElement.query(By.css('button'));
            logoutButton.nativeElement.click();

            expect(authService.logout).toHaveBeenCalled(); // Logout method should be called
        });
    });
});
