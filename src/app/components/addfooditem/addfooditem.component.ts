import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuisines } from 'src/app/classes/cuisines';
import { Fooditem } from 'src/app/classes/fooditem';
import { Foodoffers } from 'src/app/classes/foodoffers';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FooditemService } from 'src/app/services/fooditem.service';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-addfooditem',
  templateUrl: './addfooditem.component.html',
  styleUrls: ['./addfooditem.component.css']
})
export class AddfooditemComponent implements OnInit {

  public saveForm: FormGroup;
  public submitted = false;

  public isSaved : boolean = false;
  fooditem : Fooditem = {};

  cuisine : Cuisines | any = {};
  cuisinelist : Cuisines[] |any = [];

  foodoffer : Foodoffers | any = {};
  foodofferlist : Foodoffers[] |any = [];

  constructor(private router: Router,private fooditemservice :FooditemService,private cuisineservice: CuisineService) 
  { 
    this.saveForm = new FormGroup({
      foodname: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]),
      description: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]), 
      cuisines: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace,Validators.pattern('^[0-9]+\\.[0-9]{1,2}$')]),
      offers: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]),
      foodstatus: new FormControl('', [Validators.required])
    }); 
  }

  ngOnInit(): void 
  {
    this.listCuisines();
    this.listFoodoffers();
  }

  get formControl() 
  {
    return this.saveForm.controls;
  }

  listFoodoffers()
  {
    this.fooditemservice.getAllFoodOffers().subscribe(
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

  save()
  {
    this.submitted = true;
    
    if (this.saveForm.valid)
    {
      console.log(this.saveForm.value.foodname);
      this.fooditem.foodname = this.saveForm.value.foodname;
      this.fooditem.fddescription = this.saveForm.value.description;
      this.fooditem.cuisinename = this.saveForm.value.cuisines;
      this.fooditem.price = this.saveForm.value.price;
      this.fooditem.offers = this.saveForm.value.offers;
      this.fooditem.image = this.saveForm.value.image;
      this.fooditem.foodstatus = this.saveForm.value.foodstatus;
      this.fooditemservice.addNewFoodItem(this.fooditem).subscribe(
        data => {
          console.log(data);
          this.isSaved = true;
          this.submitted = false;
          this.saveForm.reset();
        },
        error => {
          console.log('Got error while saving food item into database',error);
        }
      );
    }
  }

}
