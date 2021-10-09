import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-ordermsgdisplay',
  templateUrl: './ordermsgdisplay.component.html',
  styleUrls: ['./ordermsgdisplay.component.css']
})
export class OrdermsgdisplayComponent implements OnInit {

  logIn : Boolean = false;
  user : string | any ;

  ordertrackingno : string = "";
  constructor(private router: Router,private checkoutservice:CheckoutService) 
  { 
    let logged = sessionStorage.getItem("loggedIn");
    console.log(logged);
    this.logIn = this.getBoolean(logged);
    console.log(this.logIn);
    this.user = sessionStorage.getItem("user");
  }

  ngOnInit(): void 
  {
    this.ordertrackingno = this.checkoutservice.orderTrackingNo;
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
    
    this.router.navigate(["/home/about"]);
  }

}
