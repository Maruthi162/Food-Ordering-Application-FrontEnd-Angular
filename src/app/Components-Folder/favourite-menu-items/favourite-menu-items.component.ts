import { Component } from '@angular/core';
import { MenuItem } from '../../Models/MenuItem';
import { Router } from '@angular/router';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItemDetailsDialogComponent } from '../menu-item-details-dialog/menu-item-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CartServicesService } from '../../Services-Folder/cart-services.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-favourite-menu-items',
  standalone: true,
  imports: [MaterialUIModule, CommonModule, FormsModule],
  templateUrl: './favourite-menu-items.component.html',
  styleUrl: './favourite-menu-items.component.css'
})
export class FavouriteMenuItemsComponent {

  favMenuItems: MenuItem[] = [];
  //dictionary to store the cart menuitems to toggle the add to cart/ Go to cart buttons
  cartItems: { [key: number]: boolean } = {};
  constructor(private router: Router, private custSers: CustomerServicesService, private authServ: AuthServiceService, private dialog: MatDialog, private cartServ: CartServicesService) {

  }
  userId: string = this.authServ.userId;
  ngOnInit(): void {
    this.getFavMenuItems(this.userId);
    this.checkCartItems();
  }
  //get he all the liked item of the user
  getFavMenuItems(userId: string) {
    this.custSers.getFavouriteMenuItems(userId).subscribe(response => {
      if (response) {
        this.favMenuItems = response;
        console.log(this.favMenuItems);
      }
    }, (error) => {
      console.log("error in getting favManuItems: ", error);
    });
  }
  // when user clicks on like button agin this method will be called and remove that item from liked items
  RemoveFromFavMenu(menuId: number, userId: string) {
    this.custSers.RemoveMenuItemFromFavourites(menuId, userId).subscribe(response => {

      console.log("successfully removed from favs", response);
      this.favMenuItems = this.favMenuItems.filter(mi => mi.menuItemId != menuId);
    }, (error) => {
      console.log("error in removing menu item from favs", error);
    });
  }

  //check if the items from cart and make the cartItems dictionary to true if it is in cart with menuitemId
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
  //open the dialouge with item details
  openDialog(menuItem: MenuItem): void {
    const dialogRef = this.dialog.open(MenuItemDetailsDialogComponent, {
      width: '700px',
      data: menuItem
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog has been closed ", result);
    });
  }
  //open the cart dialouge to enter the quantity
  openCartDialog(menuItem: MenuItem): void {
    const dialogRef = this.dialog.open(AddToCartComponent, {
      width: '700px',
      data: menuItem
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog has been closed ", result);
      this.checkCartItems(); // Refresh the cart items after closing the dialog
      this.getFavMenuItems(this.userId); // refresh the fav items
    });
  }

  // move to the cart
  goToCart(): void {
    this.router.navigate(['/get-cart-items']);
  }
}
