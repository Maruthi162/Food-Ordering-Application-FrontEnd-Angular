import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisteredUser } from '../Models/RegisteredUser';
import { ResponseMsg } from '../Models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl="https://localhost:44351/api/Authentication";

  private tokenKey='token';
   
  isCustomerLoggedIn:boolean=false;
  isAdminLoggedIn:boolean=false;
  isOwnerLoggedIn:boolean=false;
  userId!:string;

  constructor(private http:HttpClient) 
  {

  }

  login(credentials:{email:string, password:string}):Observable<boolean>{
    return this.http.post<any>(`${this.apiUrl}/login`,credentials).pipe(
      map(response=>{
        const token=response?.token;
        this.userId=response.userId;
        console.log(this.userId);
        if(token){
          localStorage.setItem(this.tokenKey,token);
          const role=this.getUserRole();
          console.log("Role in authService:",role);
          this.isAdminLoggedIn= role=='Admin';
          this.isCustomerLoggedIn= role=='Customer';
          this.isOwnerLoggedIn= role=='Owner';
          return true;
        }
        return false;
      }),
      catchError(()=>of(false))
    );
  }

  getToken():string |null{
    return localStorage.getItem(this.tokenKey);
  }
  getUserRole():string |null{
    const token=this.getToken();
    if(token){
      const decodedToken=JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded Token: ", decodedToken);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(role);
      return role;
    }
    return null;
  }

  logOut():void{
    localStorage.removeItem(this.tokenKey);
    this.isAdminLoggedIn=false;
    this.isCustomerLoggedIn=false;
    this.isOwnerLoggedIn=false;
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem(this.tokenKey);
  }
  isTokenExpired():boolean{
    const token=this.getToken();
    if(token){
      //Decode token
      const expiration=(JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime()/1000))>=expiration;
    }
    return true; //token not found or expired
  }

  register(registeredUser:RegisteredUser,role:string):Observable<ResponseMsg>
  {
    return this.http.post<any>(`${this.apiUrl}/Register?role=${role}`,registeredUser);
  }
}
