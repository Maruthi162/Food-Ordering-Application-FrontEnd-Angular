import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components-Folder/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './Components-Folder/customer-dashboard/customer-dashboard.component';
import { OwnerDashboardComponent } from './Components-Folder/owner-dashboard/owner-dashboard.component';
import { LoginComponentComponent } from './Components-Folder/login-component/login-component.component';
import { RegisterComponentComponent } from './Components-Folder/register-component/register-component.component';
import { authGaurdGuard } from './Gaurds/auth-gaurd.guard';
import { RestaurantOrdersComponent } from './Components-Folder/restaurant-orders/restaurant-orders.component';
import { RestaurantsListComponent } from './Components-Folder/restaurants-list/restaurants-list.component';
import { FavoriteRestaurantsComponent } from './Components-Folder/favorite-restaurants/favorite-restaurants.component';
import { CategoryListComponent } from './Components-Folder/category-list/category-list.component';
import { MenuListComponent } from './Components-Folder/menu-list/menu-list.component';
import { MenuItemsByCategoryComponent } from './Components-Folder/menu-items-by-category/menu-items-by-category.component';
import { RestauarantCategoriesComponent } from './Components-Folder/restauarant-categories/restauarant-categories.component';
import { FavouriteMenuItemsComponent } from './Components-Folder/favourite-menu-items/favourite-menu-items.component';
import { CartItemslistComponent } from './Components-Folder/cart-itemslist/cart-itemslist.component';

export const routes: Routes = [
    {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[authGaurdGuard], data:{'requiredRole':'Admin'}},
    {path:'customer-dashboard', component:CustomerDashboardComponent, canActivate:[authGaurdGuard], data:{'requiredRole':'Customer'}},
    {path:'owner-dashboard', component:OwnerDashboardComponent, canActivate:[authGaurdGuard], data:{'requiredRole':'Owner'}},
    {path:'login', component:LoginComponentComponent},
    {path:'register', component:RegisterComponentComponent},
    {path:'rest-orders', component:RestaurantOrdersComponent, canActivate:[authGaurdGuard], data:{'requiredRole':'Admin'}},
    {path:'GetAllRestaurants', component:RestaurantsListComponent},
    {path:'Get-Fav-Restaurants', component:FavoriteRestaurantsComponent},
    {path:'GetAllCategories', component:CategoryListComponent},
    {path:'getAllMenuItems', component:MenuListComponent},
    {path:'getMenuByCategory/:categoryId',component:MenuItemsByCategoryComponent},
    {path:'getCategoriesByRestaurant/:restId', component:RestauarantCategoriesComponent},
    {path:'getFavmenuItems', component:FavouriteMenuItemsComponent},
    {path:'get-cart-items', component:CartItemslistComponent},
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'**', redirectTo:'/login'}
];
