import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisines } from '../classes/cuisines';
import { Fooditem } from '../classes/fooditem';
import { Foodoffers } from '../classes/foodoffers';

@Injectable({
  providedIn: 'root'
})
export class FooditemService 
{

  public foodId : number | any;

  private baseUrl : string = 'http://3.82.162.71:8080/api/';
  constructor(private http : HttpClient) 
  { 

  }

  getAllFoodItems():Observable<Fooditem[]>
  {
    return this.http.get<Fooditem[]>(this.baseUrl + 'foodlist');
  }

  addNewFoodItem(fooditem:Partial<Fooditem>):Observable<Fooditem>
  {
    return this.http.post<Fooditem>(this.baseUrl + 'addfooditem',fooditem);
  }

  enableFooditem(id : any , fooditem : Fooditem): Observable<Fooditem>
  {
    return this.http.put(`${this.baseUrl}enablefooditem/${id}` , fooditem);
    
  }

  disableFooditem(id : any , fooditem : Fooditem): Observable<Fooditem>
  {
    return this.http.put(`${this.baseUrl}disablefooditem/${id}` , fooditem);
    
  }

  getFoodItem(id:number):Observable<Fooditem>
  {
    return this.http.put<Fooditem>(this.baseUrl + 'getfooditem',id);
  }

  getAllFoodOffers():Observable<Foodoffers[]>
  {
    return this.http.get<Foodoffers[]>(this.baseUrl + 'offerslist');
  }

  editFoodItem(fooditem:Partial<Fooditem>):Observable<Fooditem>
  {
    return this.http.put<Fooditem>(this.baseUrl + 'editfooditem',fooditem);
  }
}
