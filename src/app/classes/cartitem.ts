import { Fooditem } from "./fooditem";

export class Cartitem 
{
    id?: number;
    name?: string;
    imageUrl?: string;
    unitPrice?: number;
    offers?: string
    quantity: number;

    constructor(fooditem: Fooditem) {
        this.id = fooditem.foodId;
        this.name = fooditem.foodname;
        this.imageUrl = fooditem.image;
        this.unitPrice = fooditem.price;
        this.offers = fooditem.offers
        this.quantity = 1;
    }
}
