import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cartitem } from '../classes/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Cartitem[] |any = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    let cart  = JSON.parse(sessionStorage.getItem("cartitems")as string);
    if(cart != null)
    {
    this.cartItems = Object.entries(cart).map(e => e[1]);
    }

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  addToCart(theCartItem: Cartitem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: Cartitem | any;

    let cart  = JSON.parse(sessionStorage.getItem("cartitems")as string);
    if(cart != null)
    {
      this.cartItems = Object.entries(cart).map(e => e[1]);
    }
    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      existingCartItem = this.cartItems.find( (tempCartItem: { id: number; }) => tempCartItem.id === theCartItem.id );

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
      
    }

    sessionStorage.setItem("cartitems",JSON.stringify(this.cartItems));
    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  decrementQuantity(theCartItem: Cartitem) {

    let cart  = JSON.parse(sessionStorage.getItem("cartitems")as string);
    console.log(cart);
    this.cartItems = Object.entries(cart).map(e => e[1]);

    let existingCartItem: Cartitem | any;
    existingCartItem = this.cartItems.find( (tempCartItem: { id: number; }) => tempCartItem.id === theCartItem.id );
    existingCartItem.quantity--;

    if (existingCartItem.quantity === 0) {
      this.remove(existingCartItem);
    }
    else {
      sessionStorage.setItem("cartitems",JSON.stringify(this.cartItems));
      this.computeCartTotals();
    }
    
  }

  remove(theCartItem: Cartitem) {

    let cart  = JSON.parse(sessionStorage.getItem("cartitems")as string);
    console.log(cart);
    this.cartItems = Object.entries(cart).map(e => e[1]);

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( (tempCartItem: { id: number; }) => tempCartItem.id === theCartItem.id );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      sessionStorage.setItem("cartitems",JSON.stringify(this.cartItems));
      this.computeCartTotals();
    }
  }

}
