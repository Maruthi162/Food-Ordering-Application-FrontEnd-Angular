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

@Component({
  selector: 'app-favourite-menu-items',
  standalone: true,
  imports: [MaterialUIModule, CommonModule, FormsModule],
  templateUrl: './favourite-menu-items.component.html',
  styleUrl: './favourite-menu-items.component.css'
})
export class FavouriteMenuItemsComponent {

  favMenuItems: MenuItem[] = [];
  cartItems:{ [key:number]:boolean }={};
  constructor(private router: Router, private custSers: CustomerServicesService, private authServ: AuthServiceService, private dialog:MatDialog, private cartServ:CartServicesService) {

  }
  userId: string = this.authServ.userId;
  ngOnInit(): void {
    this.getFavMenuItems(this.userId);
    this.checkCartItems();
  }
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

  RemoveFromFavMenu(menuId: number, userId: string) {
    this.custSers.RemoveMenuItemFromFavourites(menuId, userId).subscribe(response => {

      console.log("successfully removed from favs", response);
      this.favMenuItems = this.favMenuItems.filter(mi => mi.menuItemId != menuId);
    }, (error) => {
      console.log("error in removing menu item from favs", error); 
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
  openDialog(menuItem:MenuItem):void{
    const dialogRef=this.dialog.open(MenuItemDetailsDialogComponent, {
      width:'300px',
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
