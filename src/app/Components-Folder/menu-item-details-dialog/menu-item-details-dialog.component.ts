import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from '../../Models/MenuItem';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item-details-dialog',
  standalone: true,
  imports: [MaterialUIModule,CommonModule],
  templateUrl: './menu-item-details-dialog.component.html',
  styleUrl: './menu-item-details-dialog.component.css'
})
export class MenuItemDetailsDialogComponent {
  constructor(public dialogRef:MatDialogRef<MenuItemDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:MenuItem)
  {
    
  }
  onClose():void{
    this.dialogRef.close();
  }
}
