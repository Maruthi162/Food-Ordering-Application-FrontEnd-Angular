import { ChangeDetectorRef, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { Router, RouterModule } from '@angular/router';
import { Restaurant } from '../../Models/Restaurant';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../../Material-UI';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-favorite-restaurants',
  standalone: true,
  imports: [CommonModule, MaterialUIModule, RouterModule, FormsModule],
  templateUrl: './favorite-restaurants.component.html',
  styleUrl: './favorite-restaurants.component.css'
})
export class FavoriteRestaurantsComponent {

  favRests: Restaurant[] = [];

  filteredRests: Restaurant[] = [];

  searchQuery: string = "";

  FavRestCount: number = 0;


  constructor(private authService: AuthServiceService, private custService: CustomerServicesService, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }
  userId: string = this.authService.userId;
  ngOnInit() {
    this.getFavouriteRsetaurants(this.userId);
  }
  getFavouriteRsetaurants(userId: string) {
    this.custService.getFavouriteRestaurants(userId).subscribe(response => {
      if (response) {
        this.favRests = response;
        this.filteredRests = this.favRests;
        console.log(this.favRests);
        this.FavRestCount = this.favRests.length;
        console.log("count from favRest Component: ", this.FavRestCount);


      }

    }, (error) => {
      console.log("error in getting fav rests: ", error);
    });
  }

  filterRestaurants() {
    this.filteredRests = this.favRests.filter(r => r.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  RemoveFromFavRests(restId: number, userId: string) {
    this.custService.RemoveFromFavRests(restId, userId).subscribe(response => {
      console.log("removed from fav:", response);

      // Remove the restaurant from favRests array
      this.favRests = this.favRests.filter(r => r.restaurantId !== restId);

      // Remove the restaurant from filteredRests array
      this.filteredRests = this.filteredRests.filter(r => r.restaurantId !== restId);

      this.changeDetectorRef.detectChanges();
    }, error => {
      this.getFavouriteRsetaurants(this.userId);
    });
  }
  RedirectToRestCategories(restId:number){
    this.router.navigate(['/getCategoriesByRestaurant', restId]);
  }



}
