import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../Models/Category';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { Route, Router, RouterModule } from '@angular/router';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MaterialUIModule, CommonModule,RouterModule, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
    categoryList:Category[]=[];
    filteredCats:Category[]=[];
    searchQuery:string="";

    constructor(private custServ:CustomerServicesService, private router:Router){}

    ngOnInit(){
      this.GetAllCategories();
    }

    GetAllCategories(){
      this.custServ.GetAllCategories().subscribe(response=>{
        this.categoryList=response;
        this.filteredCats=this.categoryList;
        console.log(response);
      },
      (error)=>{
        console.log("error in loading categories", error);
      }
      )
    }
    filterCategories(){
        this.filteredCats=this.categoryList.filter(cat=>cat.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()));
    }
    redirectToMenu(categoryId:number){
      this.router.navigate(['/getMenuByCategory', categoryId]);
    }
    @Output() imgClick:EventEmitter<void>=new EventEmitter<void>();
    OnImageClick(){
      this.imgClick.emit();
    }
}
