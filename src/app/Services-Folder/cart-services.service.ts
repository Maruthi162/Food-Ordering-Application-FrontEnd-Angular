import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { cartDto } from '../Models/cartDto';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {

  apiUrl="https://localhost:44351/api/Cart";
  cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Reactive cart count
  constructor(private http:HttpClient) { }

  getCartItems(userId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/cart?userId=${userId}`).pipe(
      map((response:any[])=>{
        this.cartCount.next(response.length); // Update cart count
        return response;
      })
    );

  }

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable(); // Return the observable of cart count
  }

  removeFromCart(cartItemId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/delete-cart?cartItemId=${cartItemId}`);
  }

  addToCart(cartdto:cartDto):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/add-to-cart`,cartdto);
  }

  updateCart(cartdto:cartDto):Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/update-cart`,cartdto);
  }



}
