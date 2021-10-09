import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IloginCredentials } from 'src/app/interfaces/ilogin-credentials';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  
  adminCreds : IloginCredentials | any = {};
  invalidLogin: boolean = false;
  message : boolean;

  constructor(private router: Router,private loginservice : AuthService, private activatedroute: ActivatedRoute,private cmnservice:CommonService) 
  {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace]),
      password: new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace])
    });

    this.message = false;
      this.activatedroute.queryParams.subscribe(data => {
        this.message = data.msg;
      })
  }

  ngOnInit(): void 
  {
    //sessionStorage.setItem("loggedIn","false");
    //sessionStorage.setItem("user","");
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(): void 
  {
    
    this.submitted = true;
    if (this.loginForm.valid) 
    {
      this.adminCreds.username =this.loginForm.controls['username'].value;
      this.adminCreds.pword=this.loginForm.controls['password'].value;
     
      console.log(this.adminCreds.pword);
      this.loginservice.authenticate(this.adminCreds).subscribe(
        data => {
          console.log(data);
          if(data === null)
          {
            this.submitted = false;
            this.invalidLogin = true;
            this.loginForm.reset(this.loginForm.value.username);
            this.loginForm.reset(this.loginForm.value.password);
          }
          else
          {
            this.invalidLogin = false;
            if(data.role=="admin")
            {
              // this.uname = data.username.;
              // sessionStorage.setItem('username', data)
              sessionStorage.setItem("adminloggedIn","true");
              sessionStorage.setItem("admin",data.username);
              this.router.navigate(["/adminDashboard/managecuisines"]);
            }
            else
            {
              sessionStorage.setItem("loggedIn","true");
              sessionStorage.setItem("user",data.username);
              if(this.cmnservice.checklogin===true)
              {
                this.router.navigate(["/checkout"]);
              }
              else
              {
                this.router.navigate(["/foodmenu"]);
              }
            }
          }
        },
        error => {
          console.log('Got database error while validating credentials',error);
        }
      );
    } 
  }

}
