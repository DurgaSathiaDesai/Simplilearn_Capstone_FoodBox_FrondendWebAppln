import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logIn : Boolean = false;
  user : string | any ;
  constructor(private router: Router) 
  {
    let logged = sessionStorage.getItem("loggedIn");
    console.log(logged);
    this.logIn = this.getBoolean(logged);
    console.log(this.logIn);
    this.user = sessionStorage.getItem("user");
  }

  ngOnInit(): void {
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
    sessionStorage.setItem("user","");
    sessionStorage.removeItem("cartitems");
    this.router.navigate(["/home"]);
  }

}
