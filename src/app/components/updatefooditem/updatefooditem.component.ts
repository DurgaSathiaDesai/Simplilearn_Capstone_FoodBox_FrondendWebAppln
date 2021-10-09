import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fooditem } from 'src/app/classes/fooditem';
import { FooditemService } from 'src/app/services/fooditem.service';

@Component({
  selector: 'app-updatefooditem',
  templateUrl: './updatefooditem.component.html',
  styleUrls: ['./updatefooditem.component.css']
})
export class UpdatefooditemComponent implements OnInit 
{

  fooditems: Fooditem[] | any = [];
  p:number = 1;

  keyword : any;
  headElements = ['ID', 'Food Name', 'Cuisine', 'Food Description','Price', 'Offers','Image','Status',''];

  constructor(private foodservice : FooditemService,private router: Router) 
  { 

  }

  ngOnInit(): void 
  {
    this.listAllfooditems();
  }

  listAllfooditems()
  {
    this.foodservice.getAllFoodItems().subscribe(
      fooditems => this.fooditems = fooditems,
      error => {
        console.log('Got error while fetching food items list',error);
      }
    );
  }

  enableFooditem(fooditem : Fooditem)
  {
    fooditem.foodstatus = "available";
    this.foodservice.enableFooditem(fooditem.foodId,fooditem).subscribe(
      resdata => {
        console.log(resdata);
        //alert("Password updated successfully!!Please login using new credentials");
        //this.router.navigate(["/adminLogin"], {queryParams: {msg: this.success}});
        this.listAllfooditems();
      },
      error => {
        console.log('Got database error while enabling fooditem',error);
      }
    );
  }

  disableFooditem(fooditem : Fooditem)
  {
    fooditem.foodstatus = "NA";
    this.foodservice.enableFooditem(fooditem.foodId,fooditem).subscribe(
      resdata => {
        console.log(resdata);
        //alert("Password updated successfully!!Please login using new credentials");
        //this.router.navigate(["/adminLogin"], {queryParams: {msg: this.success}});
        this.listAllfooditems();
      },
      error => {
        console.log('Got database error while disabling fooditem',error);
      }
    );
  }

  editFooditem(fooditem : Fooditem)
  {
    this.foodservice.foodId = fooditem.foodId;
    this.router.navigate(["/adminDashboard/managefooditems/editfooditem"]);
  }

  Search()
  {
    if(this.keyword == "")
    {
      this.ngOnInit();
    }
    else
    {
      this.fooditems = this.fooditems.filter((res: { foodname: string; })=>{
        return res.foodname.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase());
      });
    }
  }

}
