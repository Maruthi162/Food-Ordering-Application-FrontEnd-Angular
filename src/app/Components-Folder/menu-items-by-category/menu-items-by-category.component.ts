import { Component } from '@angular/core';
import { MenuItem } from '../../Models/MenuItem';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { MenuItemDetailsDialogComponent } from '../menu-item-details-dialog/menu-item-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CartServicesService } from '../../Services-Folder/cart-services.service';

@Component({
  selector: 'app-menu-items-by-category',
  standalone: true,
  imports: [MaterialUIModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './menu-items-by-category.component.html',
  styleUrl: './menu-items-by-category.component.css'
})
export class MenuItemsByCategoryComponent {
    menuItems:MenuItem[]=[];
    favMenuItems:MenuItem[]=[];
    cartItems:{[key:number]:boolean}={};
    catId:number=0;
    constructor(private route:ActivatedRoute, private custServices:CustomerServicesService,private authServ:AuthServiceService, private router:Router, private dialog:MatDialog, private cartServ:CartServicesService){}
    userId:string=this.authServ.userId;
    ngOnInit():void{
      this.route.paramMap.subscribe(param=>{
        this.catId= +param.get('categoryId')!;//used ! to avoid null
        this.getMenuItemsBycategoryId(this.catId);
        this.GetFavMenuItems(this.userId);
        this.checkCartItems();
      })
    }
    getMenuItemsBycategoryId(categoryId:number){
      this.custServices.GetMenuItemsByCategoryId(categoryId).subscribe(response=>{
        this.menuItems=response;
        console.log(response);

      },error=>{
        console.log("error in getting menu by category", error);
      })
    }
    GetFavMenuItems(userId:string){
      this.custServices.getFavouriteMenuItems(userId).subscribe(response=>{
        if(response){
          this.favMenuItems=response;
          console.log("fav menu: ", this.favMenuItems);
        }
      },(error)=>{
        console.log("error in getting fav menu", error);
      });
    }
    AddToFavMenuItems(userId:string, menuId:number){
      this.custServices.addToUserFavouriteMenuItems(userId,menuId).subscribe(response=>{
        if(response){
          console.log("succssfuly added to favMenu: ", response);
          // this.GetFavMenuItems(userId);
        }
      },(error)=>{
        console.log("error in adding item to fav: ", error);
      });
    }
  
    RemoveFromFavMenuItem(menuId:number,userId:string){
      this.custServices.RemoveMenuItemFromFavourites(menuId,userId).subscribe(response=>{
        if(response){
          console.log("removed from fav menu: ", response);
          this.GetFavMenuItems(userId);
        }      
      },(error)=>{
        console.log("error in removing item from fav menu: ", error);
      });
    }
    isFavorite(menuitem:MenuItem): boolean {
      // Check if the restaurant is in the favorite restaurants list
      return this.favMenuItems.some(favitem => favitem.menuItemId === menuitem.menuItemId)
    }
    toggleFavorite(menuitem:MenuItem) {
      const isFavorite = this.isFavorite(menuitem);
      if (isFavorite) {
        // If the restaurant is already in favorites, remove it
        this.RemoveFromFavMenuItem(menuitem.menuItemId, this.userId);
        // Remove the restaurant from the local favorites list
        this.favMenuItems = this.favMenuItems.filter(mi=>mi.menuItemId !== menuitem.menuItemId);
      } else {
        // If the restaurant is not in favorites, add it
        this.AddToFavMenuItems(this.userId, menuitem.menuItemId);
        // Add the restaurant to the local favorites list
        this.favMenuItems.push(menuitem);
      }
    }
    openDialog(menuItem:MenuItem):void{
      const dialogRef=this.dialog.open(MenuItemDetailsDialogComponent, {
        width:'300px',
        data:menuItem
      });
      dialogRef.afterClosed().subscribe(result=>{
        console.log("dialog has been closed ", result);
      });
    }

    checkCartItems(): void {
      this.cartServ.getCartItems(this.authServ.userId).subscribe(
        (response: any) => {
          this.cartItems = {};
          response.forEach((cartItem: any) => {
            this.cartItems[cartItem.menuItemId] = true;
          });
        },
        (error) => {
          console.log('Error in checking cart items', error);
        }
      );
    }

    openCartDialog(menuItem:MenuItem):void{
      const dialogRef=this.dialog.open(AddToCartComponent, {
        width:'700px',
        data:menuItem
      });
      dialogRef.afterClosed().subscribe(result=>{
        console.log("dialog has been closed ", result);
        this.checkCartItems();
      });
    }

    goToCart(): void {
      this.router.navigate(['/get-cart-items']);
    }
}
