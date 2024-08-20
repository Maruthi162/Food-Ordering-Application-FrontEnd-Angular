import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from '../../Models/MenuItem';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';
import { CartServicesService } from '../../Services-Folder/cart-services.service';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item-details-dialog',
  standalone: true,
  imports: [MaterialUIModule,CommonModule],
  templateUrl: './menu-item-details-dialog.component.html',
  styleUrl: './menu-item-details-dialog.component.css'
})
export class MenuItemDetailsDialogComponent {
  cartItems:{ [key:number]:boolean }={};
  constructor(public dialogRef:MatDialogRef<MenuItemDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:MenuItem, private cartServ:CartServicesService, private authServ:AuthServiceService, private dialog:MatDialog,private router:Router)
  {
    
  }
  ngOnInit(): void {
    this.checkCartItems();
  }
  onClose():void{
    this.dialogRef.close();
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
  //open the cart dialouge to enter the quantity
  openCartDialog(menuItem:MenuItem):void{
    const dialogRef=this.dialog.open(AddToCartComponent, {
      width:'700px',
      data:menuItem
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log("dialog has been closed ", result);
      this.checkCartItems(); // Refresh the cart items after closing the dialog
      this.dialogRef.close();
    });
  }
  // move to the cart
  goToCart(): void {
    this.router.navigate(['/get-cart-items']);
    this.dialogRef.close();
  }
}
