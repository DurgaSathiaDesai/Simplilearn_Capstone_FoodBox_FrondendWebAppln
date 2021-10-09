import { checkoutfoods } from "./checkoutfoods";
import { orders } from "./orders";
import { payment } from "./payment";

export class Purchase 
{
    order? : orders;
    checkoutfood? : checkoutfoods[];
    orderpayments? : payment | null;

    constructor()
    {
        
    }
}
