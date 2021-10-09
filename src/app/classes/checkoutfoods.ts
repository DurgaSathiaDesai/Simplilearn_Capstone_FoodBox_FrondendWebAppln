import { Cartitem } from "./cartitem";

export class checkoutfoods 
{
    foodid? : number;
    foodname? : string;
    price? : number;
    offers? : string;
    quantity? : number;

    constructor(cartItem: Cartitem)
    {
        this.foodid = cartItem.id;
        this.foodname = cartItem.name;
        this.price = cartItem.unitPrice;
        this.offers = cartItem.offers;
        this.quantity = cartItem.quantity;
    }
}
