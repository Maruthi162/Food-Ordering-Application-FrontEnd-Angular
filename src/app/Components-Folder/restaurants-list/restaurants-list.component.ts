import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { Router, RouterModule } from '@angular/router';
import { Restaurant } from '../../Models/Restaurant';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialUIModule } from '../../../Material-UI';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';



@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    MaterialUIModule,
    CommonModule
  ],
  templateUrl: './restaurants-list.component.html',
  styleUrl: './restaurants-list.component.css'
})
export class RestaurantsListComponent {

  restList: Restaurant[] = [];
  filteredRestList: Restaurant[] = [];
  favRests: Restaurant[] = [];
  searchQuery: string = "";
  userId!: string;

  isFavoriteClicked: boolean = false;

  constructor(private custServices: CustomerServicesService, private router: Router, private authServ: AuthServiceService) {

  }
  ngOnInit() {
    this.getAllRestaurants();
    this.userId = this.authServ.userId;
    this.getFavouriteRsetaurants(this.userId);
  }

  toggleFavorite(restaurant: Restaurant) {
    const isFavorite = this.isFavorite(restaurant);
    if (isFavorite) {
      // If the restaurant is already in favorites, remove it
      this.RemoveFromFavRests(restaurant.restaurantId, this.userId);
      // Remove the restaurant from the local favorites list
      this.favRests = this.favRests.filter(r => r.restaurantId !== restaurant.restaurantId);
    } else {
      // If the restaurant is not in favorites, add it
      this.AddToFavourite(this.userId, restaurant.restaurantId);
      // Add the restaurant to the local favorites list
      this.favRests.push(restaurant);
    }
  }


  isFavorite(restaurant: Restaurant): boolean {
    // Check if the restaurant is in the favorite restaurants list
    return this.favRests.some(favRestaurant => favRestaurant.restaurantId === restaurant.restaurantId) &&
      this.filteredRestList.some(filteredRestaurant => filteredRestaurant.restaurantId === restaurant.restaurantId);
  }
  getAllRestaurants() {
    this.custServices.getAllRestaurantas().subscribe(response => {
      if (response) {
        this.restList = response;
        this.filteredRestList = this.restList;
        console.log(this.restList);

      }
    },
      (error) => {
        console.log("error in getting restaurant list", error);
      }
    )
  }

  filterRestaurants() {
    this.filteredRestList = this.restList.filter(r => r.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  getFavouriteRsetaurants(userId: string) {
    this.custServices.getFavouriteRestaurants(userId).subscribe(response => {
      if (response) {
        this.favRests = response;
        console.log(this.favRests);
      }

    }, (error) => {
      console.log("error in getting fav rests: ", error);
    });

  }
  AddToFavourite(userId: string, restId: number) {
    this.custServices.addToFavouriteRest(userId, restId).subscribe(response => {
      console.log("added to Favourites", response);
      // call to get new updated list

    },
      error => {
        console.log("error in adding fav: ", error);
      });
  }

  RemoveFromFavRests(restId: number, userId: string) {
    this.custServices.RemoveFromFavRests(restId, userId).subscribe(reponse => {
      console.log("removed from fav:", reponse);

    }, error => {
      console.log("error in removing fav Rest: ", error);
    }
    )
  }
  //passing rest Id from here to restaurant categories componnet
  RedirectToRestCategories(restId: number) {
    this.router.navigate(['/getCategoriesByRestaurant', restId]);
  }
  //event emiter to handle redirection in app component
  @Output() imgClick:EventEmitter<void>=new EventEmitter<void>();

  OnImageClick():void{
    this.imgClick.emit();
  }



}
