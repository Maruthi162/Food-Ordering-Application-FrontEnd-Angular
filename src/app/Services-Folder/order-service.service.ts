import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  apiUrl= "https://localhost:44351/api/Orders";

  constructor(private http: HttpClient) { }

  placeOrder(userId:string, paymentMethod:string):Observable<any>{
    const url=`${this.apiUrl}/place-order?userId=${userId}&paymentMethod=${paymentMethod}`;
    return this.http.post(url,{});
  }
}

