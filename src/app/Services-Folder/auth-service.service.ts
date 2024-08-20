import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisteredUser } from '../Models/RegisteredUser';
import { ResponseMsg } from '../Models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl = "https://localhost:44351/api/Authentication"; // API base URL

  private tokenKey = 'token'; // Key to store JWT token in local storage

  // Flags to determine which type of user is logged in
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  isOwnerLoggedIn: boolean = false;
  userId!: string; // Store logged in user's ID

  constructor(private http: HttpClient) { }

  // Login method to authenticate user
  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        const token = response?.token; // Extract token from response
        this.userId = response.userId; // Store user ID
        if (token) {
          localStorage.setItem(this.tokenKey, token); // Save token to local storage
          const role = this.getUserRole(); // Decode role from token
          console.log("Role in authService:", role);

          // Set login flags based on user role
          this.isAdminLoggedIn = role === 'Admin';
          this.isCustomerLoggedIn = role === 'Customer';
          this.isOwnerLoggedIn = role === 'Owner';
          return true; // Return true if login successful
        }
        return false; // Return false if login failed
      }),
      catchError(() => of(false)) // Handle errors by returning false
    );
  }

  // Method to retrieve JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Method to decode and retrieve user role from JWT token
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token
      console.log("Decoded Token: ", decodedToken);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(role);
      return role; // Return the user role
    }
    return null; // Return null if no token found
  }

  // Logout method to clear authentication data
  logOut(): void {
    localStorage.removeItem(this.tokenKey); // Remove token from local storage
    this.isAdminLoggedIn = false; // Reset admin login flag
    this.isCustomerLoggedIn = false; // Reset customer login flag
    this.isOwnerLoggedIn = false; // Reset owner login flag
  }

  // Method to check if any user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Return true if token exists
  }

  // Method to check if the JWT token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const expiration = (JSON.parse(atob(token.split('.')[1]))).exp; // Decode expiration time
      return (Math.floor((new Date).getTime() / 1000)) >= expiration; // Compare with current time
    }
    return true; // Return true if token not found or expired
  }


  // Registration method to create a new user
  register(registeredUser: RegisteredUser, role: string): Observable<ResponseMsg> {
    return this.http.post<any>(`${this.apiUrl}/Register?role=${role}`, registeredUser);
  }
}
