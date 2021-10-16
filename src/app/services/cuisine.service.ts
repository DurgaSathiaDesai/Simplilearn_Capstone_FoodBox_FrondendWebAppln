import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisines } from '../classes/cuisines';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {

  private baseUrl : string = 'http://localhost:8080/foodboxWebApplication/api/';
  constructor(private http : HttpClient) { }

  getAllCuisines():Observable<Cuisines[]>
  {
    return this.http.get<Cuisines[]>(this.baseUrl + 'cuisinelist');
  }

  addCuisine(cuisine : Cuisines) : Observable<Cuisines>
  {
    return this.http.post(this.baseUrl + 'addcuisine',cuisine);
  }

  removeCuisine(id : any):Observable<Cuisines>
  {
    return this.http.delete<Cuisines>(`${this.baseUrl}removecuisine/${id}`);
    
  }
}
