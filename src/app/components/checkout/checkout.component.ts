import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cartitem } from 'src/app/classes/cartitem';
import { checkoutfoods } from 'src/app/classes/checkoutfoods';
import { orders } from 'src/app/classes/orders';
import { payment } from 'src/app/classes/payment';
import { Purchase } from 'src/app/classes/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CommonService } from 'src/app/services/common.service';
import { Customvalidators } from 'src/app/validators/customvalidators';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  logIn : Boolean = false;
  user : string | any ;

  checkoutFormGroup: FormGroup;
  isSelected : boolean = false;
  public submitted = false;

  iscashchecked : boolean = false;
  iscardchecked : boolean = false;
  paymenterror : boolean = false;

  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  payment : string = "";
  constructor(private cmnservice : CommonService,private router: Router,private cartservice:CartService,private checkoutservice:CheckoutService) 
  { 
    let logged = sessionStorage.getItem("loggedIn");
    console.log(logged);
    this.logIn = this.getBoolean(logged);
    console.log(this.logIn);
    this.user = sessionStorage.getItem("user");

    this.checkoutFormGroup = new FormGroup({
      firstname: new FormControl('', 
                            [Validators.required,
                             Validators.pattern('^[a-zA-Z]*$'), 
                            Customvalidators.notOnlyWhitespace]),

      lastname:  new FormControl('', 
                            [Validators.required, 
                             Validators.pattern('^[a-zA-Z]*$'), 
                             Customvalidators.notOnlyWhitespace]),
      
      contactno: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(10), 
                            Validators.pattern('^[0-9]*$'),
                            Customvalidators.notOnlyWhitespace]),
      emailId: new FormControl('',
                            [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
     /*  payment: new FormControl(''), */
      address: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]),                      
      cash :   new FormControl(''),                    
      card :   new FormControl(''),                         
      nameoncard:  new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), 
                                         Customvalidators.notOnlyWhitespace]),
      cardnumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
      cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
      expMonth: new FormControl('',Validators.required),
      expYear:  new FormControl('',Validators.required)
  });
  }

  ngOnInit(): void 
  {
    this.reviewCartDetails();
   
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.cmnservice.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    ); 

    // populate credit card years

    this.cmnservice.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    ); 
  }

  get formControl() 
  {
    return this.checkoutFormGroup.controls;
  } 

  getBoolean(value : string | null){
    switch(value){
         case "true":
             return true;
         default: 
             return false;
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
    sessionStorage.removeItem("cartitems");
    this.router.navigate(["/home/about"]);
  }

  reviewCartDetails() 
  {
    this.cartservice.computeCartTotals();
    // subscribe to cartService.totalQuantity
    this.cartservice.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartservice.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }
  selectcard(mode : string)
  {
    //if this.checked
    this.isSelected = true;
    this.payment = mode;
    this.iscardchecked = true;
    this.iscashchecked = false;
    this.paymenterror = false;
    this.enablepayment();

  }

  selectcash(mode : string)
  {
    
    this.isSelected = false;
    this.payment = mode;
    this.iscardchecked = false;
    this.iscashchecked = true;
    this.paymenterror = false;
    this.disablepayment();
   
  }

  handleMonthsAndYears()
  {
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(this.checkoutFormGroup.value.expYear);

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.cmnservice.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  disablepayment()
  {
    this.checkoutFormGroup.controls['nameoncard'].disable();
    this.checkoutFormGroup.controls['cardnumber'].disable();
    this.checkoutFormGroup.controls['cvv'].disable();
    this.checkoutFormGroup.controls['expYear'].disable();
    this.checkoutFormGroup.controls['expMonth'].disable(); 
  }

  enablepayment()
  {
    this.checkoutFormGroup.controls['nameoncard'].enable();
    this.checkoutFormGroup.controls['cardnumber'].enable();
    this.checkoutFormGroup.controls['cvv'].enable();
    this.checkoutFormGroup.controls['expYear'].enable();
    this.checkoutFormGroup.controls['expMonth'].enable();
  }

  placeOrder()
  {
     
     if(this.iscashchecked == false && this.iscardchecked == false)
     {
        this.paymenterror = true;
        return;
     }
     else
     {
       this.submitted = true;
       if (this.checkoutFormGroup.valid)
       {
          let purchase = new Purchase();
          let order = new orders();
  
          order.firstname = this.checkoutFormGroup.value.firstname;
          order.lastname = this.checkoutFormGroup.value.lastname;
          order.contactNo = this.checkoutFormGroup.value.contactno;
          order.emailId = this.checkoutFormGroup.value.emailId;
          order.address = this.checkoutFormGroup.value.address;
          order.totalQty = this.totalQuantity;
          order.amount = this.totalPrice;
          order.paymentMode=this.payment;
  
          purchase.order = order;
  
          let cartItems: Cartitem[] | any = [];
          let cart  = JSON.parse(sessionStorage.getItem("cartitems")as string);
          if(cart != null)
          {
            cartItems = Object.entries(cart).map(e => e[1]);
          }

          let checkoutfood: checkoutfoods[] = [];
          for (let i=0; i < cartItems.length; i++) {
            checkoutfood[i] = new checkoutfoods(cartItems[i]);
          }
        
          purchase.checkoutfood = checkoutfood;
    
          if(this.payment==="Creditcard")
          {
            let orderpayments = new payment();
            orderpayments.nameOnCard = this.checkoutFormGroup.value.nameoncard;
            orderpayments.cardNumber = this.checkoutFormGroup.value.cardnumber;
            orderpayments.cvv = this.checkoutFormGroup.value.cvv;
            orderpayments.expMonth = this.checkoutFormGroup.value.expMonth;
            orderpayments.expYear = this.checkoutFormGroup.value.expYear;
            purchase.orderpayments = orderpayments;
    
          }
          else
          {
            purchase.orderpayments = null;
          }
          console.log(purchase);
          this.checkoutservice.placeOrder(purchase).subscribe({
            next: response => {
              //alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
              this.checkoutservice.orderTrackingNo = response.orderTrackingNumber;
              console.log(this.checkoutservice.orderTrackingNo);
              // reset cart
              this.resetCartandForm();
    
            },
            error: err => {
              console.log(`There was an error: ${err.message}`);
            }
          });
       }
       else
       {
         this.submitted = false;
         return;
       }
     }
  }

  resetCartandForm() {
    // reset cart data
    this.cartservice.cartItems = [];
    this.cartservice.totalPrice.next(0);
    this.cartservice.totalQuantity.next(0);
    
    sessionStorage.removeItem("cartitems");
    //sessionStorage.clear();
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/ordermsg");
  }

}
