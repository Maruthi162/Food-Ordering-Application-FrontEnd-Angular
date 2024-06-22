import { Category } from "./Category";
import { Restaurant } from "./Restaurant";

export class MenuItem{
    public menuItemId!:number;
    public name!:string;
    public price!:number;
    public description!:string;
    public availability!:number;
    public img!:string;
    public categoryId!:number;
    public category!:Category;
    public restaurantId!:number;
    public restaurant!:Restaurant;
}