import { MenuItem } from "./MenuItem";
import { User } from "./User";

export class CartItem{
    public cartItemId!:number;
    public userId!:string;
    public user!:User;
    public menuItemId!:number;
    public menuItem!:MenuItem;
    public quantity!:number;
}