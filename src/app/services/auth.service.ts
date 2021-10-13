import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdetails } from '../classes/userdetails';
import { IloginCredentials } from '../interfaces/ilogin-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  private baseUrl : string = 'http://localhost:8080/api/';

  constructor(private http : HttpClient) 
  { 

  }

  authenticate(creds: IloginCredentials) : Observable<IloginCredentials | any>
  {
    return this.http.post(this.baseUrl + 'loginvalidate',creds);
  }

  register(userInfo : Userdetails) : Observable<Userdetails>
  {
    return this.http.post(this.baseUrl + 'signup',userInfo);
  }

  updateCredentials(adminCreds : Partial<IloginCredentials>): Observable<IloginCredentials>
  {
    return this.http.put<IloginCredentials>(this.baseUrl + 'updatecredentials' , adminCreds);
    
  }
}
