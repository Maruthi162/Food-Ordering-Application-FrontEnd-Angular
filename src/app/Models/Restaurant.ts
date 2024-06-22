import { User } from "./User";

export class Restaurant{
    public restaurantId!:number;
    public name!:string;
    public description!:string;
    public phoneNum!:string;
    public imgurl!:string;
    public userId!:string;
    public IsFavorite!:boolean;
    public owner!:User;

}
