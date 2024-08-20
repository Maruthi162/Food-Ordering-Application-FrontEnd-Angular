import { Component } from '@angular/core';
import { MenuCloseReason } from '@angular/material/menu';
import { MenuItem } from '../../Models/MenuItem';
import { Router, RouterModule } from '@angular/router';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemDetailsDialogComponent } from '../menu-item-details-dialog/menu-item-details-dialog.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CartServicesService } from '../../Services-Folder/cart-services.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [MaterialUIModule,
            CommonModule,
            FormsModule,
            RouterModule,
            // MenuItemDetailsDialogComponent
          ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  menuList:MenuItem[]=[];
  cartItems: { [key: number]: boolean } = {};
  filteredMenu:MenuItem[]=[];
  searchQuery:string="";
  favMenuItems:MenuItem[]=[];
  IsFavoriteClicked:boolean=false;
  constructor(private router:Router, private custServices:CustomerServicesService,private authServ:AuthServiceService, private dialog:MatDialog, private cartServ:CartServicesService){}
  userId:string=this.authServ.userId;
  ngOnInit(){
    this.GetAllMenuItems();
    this.GetFavMenuItems(this.userId);
    this.checkCartItems();
  }
  GetAllMenuItems(){
    this.custServices.GetAllMenuItems().subscribe(response=>{
      this.menuList=response;
      this.filteredMenu=this.menuList;
      console.log(response);
    },(error)=>{
      console.log("error in loading all menus", error);
    });
  }
  filterMenuItems(){
    this.filteredMenu=this.menuList.filter(m=>m.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()));
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
    return this.favMenuItems.some(favitem => favitem.menuItemId === menuitem.menuItemId) &&
         this.filteredMenu.some(filteredMenu => filteredMenu.menuItemId === menuitem.menuItemId);
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
      width:'700px',
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
      this.checkCartItems(); // Refresh the cart items after closing the dialog
      this.GetAllMenuItems(); // refresh the menu list after added to cart to update the go to cart button
    });
  }

  

  goToCart(): void {
    this.router.navigate(['/get-cart-items']);
  
    
  }
 
}
