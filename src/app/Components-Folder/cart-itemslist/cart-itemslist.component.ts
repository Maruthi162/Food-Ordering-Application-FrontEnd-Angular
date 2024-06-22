import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../Models/CartItem';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { CartServicesService } from '../../Services-Folder/cart-services.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemDetailsDialogComponent } from '../menu-item-details-dialog/menu-item-details-dialog.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuItem } from '../../Models/MenuItem';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';
import { cartDto } from '../../Models/cartDto';

@Component({
  selector: 'app-cart-itemslist',
  standalone: true,
  imports: [MaterialUIModule, RouterModule,CommonModule],
  templateUrl: './cart-itemslist.component.html',
  styleUrls: ['./cart-itemslist.component.css']
})
export class CartItemslistComponent implements OnInit {

  cartItems: CartItem[] = [];
  cartItem!:CartItem;
  totalPrice:number=0;
  constructor(
    private router: Router,
    private authServ: AuthServiceService,
    private cartServ: CartServicesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCartItemsOfUser(this.authServ.userId);
  }

  getCartItemsOfUser(userId: string): void {
    this.cartServ.getCartItems(userId)
      .pipe(
        catchError(error => {
          console.error("Error in getting cart items from API", error);
          return of([]); // Return an empty array on error
        })
      )
      .subscribe(response => {
        if (response) {
          this.cartItems = response;
          console.log("Cart details from API: ", response);
          //this.calculateTotalPrice();
        }
      });
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  }

  removeFromCart(cartItemId: number): void {
    const cartItemToRemove = this.cartItems.find(ci => ci.cartItemId === cartItemId);
    
    if (cartItemToRemove) {
      this.cartServ.removeFromCart(cartItemId)
        .pipe(
          catchError(error => {
            console.error("Error in removing from cart", error);
            return of(null); // Handle the error
          })
        )
        .subscribe(response => {
          if (response) {
            console.log("Cart item removed: ", response);
            this.getCartItemsOfUser(this.authServ.userId); // Refresh cart items
            //this.calculateTotalPrice()
            //this.totalPrice -= (cartItemToRemove.quantity * cartItemToRemove.menuItem.price);
          }
        });
    } else {
      console.error("Cart item not found");
    }
  }

  openDialog(menuItem: MenuItem | undefined): void {
    const dialogRef = this.dialog.open(MenuItemDetailsDialogComponent, {
      width: '300px',
      data: menuItem
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog has been closed ", result);
    });
  }

  increaseQuantity(cartItem: CartItem) {
    cartItem.quantity += 1;
    this.updateCartItem(cartItem);
    this.totalPrice+=(1* cartItem.menuItem.price);
    
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      this.updateCartItem(cartItem);
      this.totalPrice-=(1* cartItem.menuItem.price);
    }
  }

  updateCartItem(cartItem: CartItem) {

    const updateDto: cartDto = {
     
      userId: cartItem.userId,
      menuItemId: cartItem.menuItemId,
      quantity: cartItem.quantity
    };

    this.cartServ.updateCart(updateDto).subscribe(
      response => {
        console.log("Cart item updated: ", response);
        
      },
      error => {
        console.log("Error in updating cart item", error);
      }
    );
  }

}
