import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from '../../Models/MenuItem';
import { MaterialUIModule } from '../../../Material-UI';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cartDto } from '../../Models/cartDto';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { CartServicesService } from '../../Services-Folder/cart-services.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [MaterialUIModule,RouterModule,CommonModule,FormsModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  quantity!:number;
  constructor(public dialogRef:MatDialogRef<AddToCartComponent>,
     @Inject(MAT_DIALOG_DATA) public data:MenuItem, 
     private authServ:AuthServiceService, 
     private cartServ:CartServicesService,
    private router:Router)
  {

  }
  onClose():void{
    this.dialogRef.close();
  }
  addToCart(menuItem:MenuItem){

      const cartdto:cartDto=
      {
        
        userId:this.authServ.userId,
        menuItemId: menuItem.menuItemId,
        quantity: this.quantity
      }
      this.cartServ.addToCart(cartdto).subscribe(response=>{
          console.log("item added to cart", response);
          
          this.dialogRef.close();
          // this.router.navigate(['/get-cart-items']);
      },error=>{
        console.log("error in adding to cart", error);
      }
      );
  }
}
