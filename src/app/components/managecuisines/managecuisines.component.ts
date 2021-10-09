import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cuisines } from 'src/app/classes/cuisines';
import { CuisineService } from 'src/app/services/cuisine.service';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-managecuisines',
  templateUrl: './managecuisines.component.html',
  styleUrls: ['./managecuisines.component.css']
})
export class ManagecuisinesComponent implements OnInit {

  cuisinelist : Cuisines[] |any = [];
  
  public cuisineForm: FormGroup;
  public submitted = false;
  cuisine : Cuisines | any = {};

  removedcuisine : Cuisines | any = {};
  isExists: boolean = false;
  message : boolean = false;

  p:number = 1;
  headElements = ['ID', 'Cuisine Name', ''];
  constructor(private cuisineservice: CuisineService) 
  {
    this.cuisineForm = new FormGroup({
      cuisinename: new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace,Validators.pattern('^[a-zA-Z]+(\\s[a-zA-Z]+)?$')])
    });

   
  }

  ngOnInit(): void 
  {
    this.listCuisines();
  }

  get formControl() {
    return this.cuisineForm.controls;
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

  removeCuisine(cuisine : Cuisines)
  {
    if(confirm("Do you want to remove the cuisine?"))
    {
      this.cuisineservice.removeCuisine(cuisine.cuisineId).subscribe(
        removedcuisine => {
          this.removedcuisine = removedcuisine;
          this.listCuisines();
        },
        error => {
          console.log('Got error while removing a cuisine',error);
        }
      ); 
    }
    else
    {
      return;
    }
    
  }

  onAdd(): void 
  {
    
    this.submitted = true;
    if (this.cuisineForm.valid) 
    {
      this.cuisine.cuisinename=this.cuisineForm.controls['cuisinename'].value;
      console.log(this.cuisine.cuisinename);
      this.cuisineservice.addCuisine(this.cuisine).subscribe(
        data => {
          console.log(data);
          if(data === null)
          {
            this.isExists = true;
            this.cuisineForm.reset(this.cuisineForm.value.cuisinename);
            this.submitted = false;
            this.message = false;
          }
          else
          {
            this.listCuisines();
            this.cuisineForm.reset(this.cuisineForm.value.cuisinename);
            this.submitted = false;
            this.isExists = false;
            this.message = true;
          }
        },
        error => {
          console.log('Got database error while adding a cuisine',error);
        }
      );
    }
  }

}
