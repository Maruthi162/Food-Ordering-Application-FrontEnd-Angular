import { Component } from '@angular/core';
import { Category } from '../../Models/Category';
import { CustomerServicesService } from '../../Services-Folder/customer-services.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { MaterialUIModule } from '../../../Material-UI';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restauarant-categories',
  standalone: true,
  imports: [MaterialUIModule,RouterModule,CommonModule],
  templateUrl: './restauarant-categories.component.html',
  styleUrl: './restauarant-categories.component.css'
})
export class RestauarantCategoriesComponent {
  restaurantCategories:Category[]=[];
  restId:number=0;
  dataLoaded: boolean = false;
  constructor(private custServices:CustomerServicesService, private router:Router, private route:ActivatedRoute){}
  ngOnInit():void{
    this.route.paramMap.subscribe(param=>{
      this.restId= +param.get('restId')!;//used ! to avoid null
      console.log(this.restId);
      this.GetRestaurantCategories(this.restId);
    })
  }
  GetRestaurantCategories(restId:number){
    this.custServices.GetCategoriesByRestId(restId).subscribe(response=>{
      this.restaurantCategories=response;
      this.dataLoaded=true;
      console.log("rest Cats: ", this.restaurantCategories);
    },error=>{
      console.log("error in loading restaurant categories: ", error);
    });
  }
  redirectToMenu(categoryId:number){
    this.router.navigate(['/getMenuByCategory', categoryId]);
  }
}
