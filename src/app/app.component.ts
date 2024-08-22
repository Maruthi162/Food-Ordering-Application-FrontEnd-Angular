import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RegisterComponentComponent } from './Components-Folder/register-component/register-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './Services-Folder/auth-service.service';
import { CommonModule } from '@angular/common';
import { RestaurantsListComponent } from "./Components-Folder/restaurants-list/restaurants-list.component";
import { MaterialUIModule } from '../Material-UI';
import { TestingComponent } from "./Components-Folder/testing/testing.component";
import { FavoriteRestaurantsComponent } from './Components-Folder/favorite-restaurants/favorite-restaurants.component';
import { CategoryListComponent } from './Components-Folder/category-list/category-list.component';
import { MenuListComponent } from './Components-Folder/menu-list/menu-list.component';
import { CartServicesService } from './Services-Folder/cart-services.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterOutlet,
    RegisterComponentComponent,
    CommonModule,
    RouterModule,
    RestaurantsListComponent,
    MaterialUIModule,
    TestingComponent,
    FavoriteRestaurantsComponent,
    CategoryListComponent,
    MenuListComponent
  ]
})
export class AppComponent {

  favRestCount: number = 0;
  showOtherComponent: boolean = false;
  cartCount:number=0;

  constructor(public authService: AuthServiceService, public router:Router, public cartServ:CartServicesService) {
      // Subscribe to cart count changes
      this.cartServ.getCartCount().subscribe(count => {
      this.cartCount = count;
      });
   }
  title = 'FlashFoods-Angular';
  
  // Method to toggle the flag and show the other component
  showOther() {
    this.showOtherComponent = true;
  }
  backHome() {
    this.showOtherComponent = false;
  }
  logout() {
    this.authService.logOut();  // Clear user session data
    this.showOtherComponent = false;  // Ensure other components are hidden
    this.router.navigate(['/login']);  // Navigate to login page
  }
}
