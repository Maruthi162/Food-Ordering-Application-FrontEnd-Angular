import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../Models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class CustomerServicesService {
 
  apiUrl="https://localhost:44351/api/Customer";
  constructor(private http: HttpClient) { }

  getAllRestaurantas():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Get all restaurants`);
  }

  getFavouriteRestaurants(userId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Get User Favorite restaurants?userId=${userId}`);
  }

   addToFavouriteRest(userId:string,restId:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/AddRestaurantToFavorite?userId=${userId}&restId=${restId}`,{});
  }

  RemoveFromFavRests(restId:number,userId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/Remove Restaurant from favourite?restId=${restId}&userId=${userId}`);
  }
  getFavouriteMenuItems(userId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Get-Fav-Items?userId=${userId}`);
  }
  addToUserFavouriteMenuItems(userId:string, menuId:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/add-to-favMenu?userId=${userId}&menuId=${menuId}`,{});
  }
  RemoveMenuItemFromFavourites(menuId:number,userId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/Remove-favItem?menuId=${menuId}&userId=${userId}`);
  }
  GetAllCategories():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/GetAllCategories`);
  }
  GetAllMenuItems():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/menu items`);
  }
  GetMenuItemsByCategoryId(catID:number){
    return this.http.get<any> (`${this.apiUrl}/GetMenuItemsByCategoryId?categoryId=${catID}`);
  }
  GetCategoriesByRestId(restId:number){
    return this.http.get<any>(`${this.apiUrl}/get Category by rest?restId=${restId}`);
  }

}
