import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuisines } from 'src/app/classes/cuisines';
import { Fooditem } from 'src/app/classes/fooditem';
import { Foodoffers } from 'src/app/classes/foodoffers';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FooditemService } from 'src/app/services/fooditem.service';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-editfooditem',
  templateUrl: './editfooditem.component.html',
  styleUrls: ['./editfooditem.component.css']
})
export class EditfooditemComponent implements OnInit {

  foodId: number | any;

  fooditem : Fooditem = {};

  public updateFoodForm: FormGroup;
  public submitted = false;

  public isSaved : boolean = false;
 

  cuisine : Cuisines | any = {};
  cuisinelist : Cuisines[] |any = [];

  foodoffer : Foodoffers | any = {};
  foodofferlist : Foodoffers[] |any = [];

  constructor(private route: ActivatedRoute,private foodservice : FooditemService,private cuisineservice: CuisineService,private router: Router) 
  { 
    this.updateFoodForm = new FormGroup({
      foodid: new FormControl(),
      foodname: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]),
      description: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]), 
      cuisines: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace,Validators.pattern('^[0-9]+\\.[0-9]{1,2}$')]),
      offers: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace])
    }); 
  }

  ngOnInit(): void 
  {
    /* this.route.paramMap.subscribe(() => {
      this.getfooditem();
    }); */
    this.listCuisines();
    this.listFoodoffers();
    this.foodId = this.foodservice.foodId;
    console.log(this.foodId);
    this.getfooditem();
  }

  get formControl() 
  {
    return this.updateFoodForm.controls;
  }

  listFoodoffers()
  {
    this.foodservice.getAllFoodOffers().subscribe(
      foodofferlist => this.foodofferlist = foodofferlist,
      (      error: any) => {
        console.log('Got error while fetching food items list',error);
      }
    );
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

  getfooditem()
  {

   this.foodservice.getFoodItem(this.foodId).subscribe(
      (data: Fooditem) => {
        this.fooditem = data;
        console.log(this.fooditem.foodname);
        this.updateFoodForm.controls['foodid'].setValue(this.fooditem.foodId);
        this.updateFoodForm.controls['foodname'].setValue(this.fooditem.foodname);
        this.updateFoodForm.controls['description'].setValue(this.fooditem.fddescription);
        this.updateFoodForm.controls['cuisines'].setValue(this.fooditem.cuisinename);
        this.updateFoodForm.controls['price'].setValue(this.fooditem.price + ".00");
        this.updateFoodForm.controls['offers'].setValue(this.fooditem.offers);
        this.updateFoodForm.controls['image'].setValue(this.fooditem.image);

      },
      error => {
        console.log('Got error while fetching food item from database',error);
      }
    ) 
  }

  update()
  {
    this.submitted = true;
    
    if (this.updateFoodForm.valid)
    {
      //console.log(this.updateFoodForm.value.foodname);
      this.fooditem.foodId = this.updateFoodForm.value.foodid;
      this.fooditem.foodname = this.updateFoodForm.value.foodname;
      this.fooditem.fddescription = this.updateFoodForm.value.description;
      this.fooditem.cuisinename = this.updateFoodForm.value.cuisines;
      this.fooditem.price = this.updateFoodForm.value.price;
      this.fooditem.offers = this.updateFoodForm.value.offers;
      this.fooditem.image = this.updateFoodForm.value.image;
    
      this.foodservice.editFoodItem(this.fooditem).subscribe(
        data => {
          console.log(data);
          this.isSaved = true;
          this.submitted = false;
          this.updateFoodForm.reset();
        },
        error => {
          console.log('Got error while saving food item into database',error);
        }
      );
    }
  }

}
function foodid(foodid: any, foodId: number | undefined) {
  throw new Error('Function not implemented.');
}

