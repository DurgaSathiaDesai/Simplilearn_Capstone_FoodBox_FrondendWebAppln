import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitem } from 'src/app/classes/cartitem';
import { CartService } from 'src/app/services/cart.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {

  logIn : Boolean = false;
  user : string | any ;

  cartItems: Cartitem[] | any = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  isempty : boolean = false;

  checklogin : boolean = false;

  constructor(private router: Router,private cartService: CartService,private cmnservice:CommonService) 
  { 
    let logged = sessionStorage.getItem("loggedIn");
    console.log(logged);
    this.logIn = this.getBoolean(logged);
    console.log(this.logIn);
    this.user = sessionStorage.getItem("user");
  }

  ngOnInit(): void 
  {
    this.listCartItems();
  }

  getBoolean(value : string | null){
    switch(value){
         case "true":
             return true;
         default: 
             return false;
     }
  }

  check()
  {
    let logged = sessionStorage.getItem("loggedIn");
    if(logged=="true")
    {
      this.router.navigate(["/checkout"]);
    }
    else
    {
      this.checklogin = true;
      this.cmnservice.checklogin = this.checklogin;
      this.router.navigate(["/login"]);
    }
  }

  logout(e:Event)
  {
    console.log(e);
    this.logIn = false;
    sessionStorage.removeItem("loggedIn");
    sessionStorage.setItem("loggedIn","false");
    console.log(sessionStorage.getItem("loggedIn"));
    //sessionStorage.setItem("user","");
    
    this.router.navigate(["/home/about"]);
  }

  incrementQuantity(theCartItem: Cartitem) {
    this.cartService.addToCart(theCartItem);
    this.listCartItems();
  }

  decrementQuantity(theCartItem: Cartitem) {
    this.cartService.decrementQuantity(theCartItem);
    this.listCartItems();
  }

  remove(theCartItem: Cartitem) {
    this.cartService.remove(theCartItem);
    this.listCartItems();
  }

  order()
  {

  }

  listCartItems()
  {
    /* if(this.cartService.cartItems.length == 0)
    {
      this.cartItems = this.cartService.cartItems;
    }
    else
    { */
    let cart  = JSON.parse(sessionStorage.getItem("cartitems")as string);
    console.log(cart);
    if(cart != null)
    {
    this.cartItems = Object.entries(cart).map(e => e[1]);
    }
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
    //}
    
  }



}
