import { NgModule } from "@angular/core";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from "@angular/platform-browser";
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
    exports:[
        MatGridListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatBottomSheetModule,
        MatMenuModule,
        MatBadgeModule,
        MatDialogModule,
        MatRadioModule
    ]
})
export class MaterialUIModule{}