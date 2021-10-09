import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cartitem } from 'src/app/classes/cartitem';
import { Cuisines } from 'src/app/classes/cuisines';
import { Fooditem } from 'src/app/classes/fooditem';
import { CartService } from 'src/app/services/cart.service';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FooditemService } from 'src/app/services/fooditem.service';

@Component({
  selector: 'app-foodmenu',
  templateUrl: './foodmenu.component.html',
  styleUrls: ['./foodmenu.component.css']
})
export class FoodmenuComponent implements OnInit {

  logIn : Boolean = false;
  user : string | any ;

  cuisinelist : Cuisines[] |any = [];

  totalPrice: number= 0.00;
  totalQuantity: number = 0;
  
  fooditems: Fooditem[] | any = [];
  keyword : any;
  p:number = 1;
  headElements = ['Food Name', 'Price'];

  sortval : boolean = false;
  sorttype: string = "priceasc";
  //All : boolean = true;
  selectedindex : number = -1;

  constructor(private router: Router, private cuisineservice: CuisineService,private foodservice : FooditemService,private cartservice : CartService) 
  { 
    let logged = sessionStorage.getItem("loggedIn");
    console.log(logged);
    this.logIn = this.getBoolean(logged);
    console.log(this.logIn);
    this.user = sessionStorage.getItem("user");
  }

  getBoolean(value : string | null){
    switch(value){
         case "true":
             return true;
         default: 
             return false;
     }
  }
  ngOnInit(): void 
  {
    //this.loggedIn = Boolean(sessionStorage.getItem("loggedIn"));
    this.listCuisines();
    this.getFooditems();
    this.updateCartStatus();
  }

  getFooditems()
  {
    this.foodservice.getAllFoodItems().subscribe(
      fooditems => this.fooditems = fooditems.filter(fooditem => fooditem.foodstatus === "available"),
      error => {
        console.log('Got error while fetching food items list',error);
      }
    );
  }

  updateCartStatus() {

    this.cartservice.computeCartTotals();
    // subscribe to the cart totalPrice
    this.cartservice.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartservice.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  logout(e:Event)
  {
    console.log(e);
    this.logIn = false;
    sessionStorage.removeItem("loggedIn");
    sessionStorage.setItem("loggedIn","false");
    console.log(sessionStorage.getItem("loggedIn"));
    //sessionStorage.setItem("user","");
    sessionStorage.removeItem("cartitems");
    this.router.navigate(["/home/about"]);
  }

  listCuisines()
  {
    this.cuisineservice.getAllCuisines().subscribe(
      cuisinelist => this.cuisinelist = cuisinelist,
      error => {
        console.log('Got error while fetching food items list',error);
      }
    );
  }

  Search()
  {
    if(this.keyword == "")
    {
      this.ngOnInit();
    }
    else
    {
      /* this.foodservice.getAllFoodItems().subscribe(
        fooditems => this.fooditems = fooditems.filter((res : Fooditem | any)=>{
          return res.foodname.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase());
        }),
        error => {
          console.log('Got error while fetching food items list',error);
        }); */
      this.fooditems = this.fooditems.filter((res: { foodname: string; })=>{
        return res.foodname.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase());
      });
    }
  }

  get(index:number,cuisine:Cuisines)
  {
    console.log(index);
    //this.All= false;
    this.selectedindex = index;
    this.foodservice.getAllFoodItems().subscribe(
      fooditems => this.fooditems = fooditems.filter(fooditem => fooditem.cuisinename === cuisine.cuisinename && fooditem.foodstatus === "available"),
      error => {
        console.log('Got error while fetching food items list',error);
      }
    );
  }


  changesort()
  {
    
   /*  console.log(this.sorttype);
    if(this.sorttype === "nameasc")
    {
      this.ordertype.next("foodname");
      this.sortval = false;
    }
    if(this.sorttype === "namedesc")
    {
      this.ordertype.next("foodname");
      this.sortval = true;
    } */
    if(this.sorttype === "priceasc")
    {
      //this.ordertype.next("price");
      this.sortval = false;
    }
    if(this.sorttype === "pricedesc")
    {
      //this.ordertype.next("price");
      this.sortval = true;
    }
   
  }

  
  isActive(index:number) {
    //this.All=false;
    return this.selectedindex === index;
};



addToCart(fooditem : Fooditem)
{
    console.log(`Adding to cart: ${fooditem.foodname}, ${fooditem.price}`);

    // TODO ... do the real work
    const theCartItem = new Cartitem(fooditem);

    this.cartservice.addToCart(theCartItem);
}

}
