import { Component } from '@angular/core';
import { MaterialUIModule } from '../../../Material-UI';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [MaterialUIModule,FormsModule,CommonModule],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css'
})
export class PaymentDialogComponent {
  selectedPaymentType!:string;
  constructor(public dialogRef:MatDialogRef<PaymentDialogComponent>){

  }
  onCancel(){
    this.dialogRef.close();
  }
  onConfirm(){
    this.dialogRef.close(this.selectedPaymentType);
  }
}
