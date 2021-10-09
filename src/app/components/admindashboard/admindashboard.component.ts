import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  logIn : Boolean = false;
  admin : string | any ;
  constructor(private router: Router) 
  { 
    let logged = sessionStorage.getItem("adminloggedIn");
    console.log(logged);
    this.logIn = this.getBoolean(logged);
    console.log(this.logIn);
    this.admin = sessionStorage.getItem("admin");
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
    sessionStorage.removeItem("adminloggedIn");
    sessionStorage.setItem("adminloggedIn","false");
    console.log(sessionStorage.getItem("adminloggedIn"));
    sessionStorage.setItem("admin","");
    
    this.router.navigate(["/home/about"]);
  }

}
