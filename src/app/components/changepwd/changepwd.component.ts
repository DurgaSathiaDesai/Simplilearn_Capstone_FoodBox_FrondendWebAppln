import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IloginCredentials } from 'src/app/interfaces/ilogin-credentials';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {

  public changepwdForm: FormGroup;
  public submitted = false;
  adminCreds : IloginCredentials | any = {};
  updateCreds : IloginCredentials = {
    loginid: 0,
    username: '',
    pword: '',
    role: '',
    availstatus: ''
  };

 // id : number = 1;
  invalidLogin: boolean = false;
  pwdmismatch : boolean = false;

  success : boolean = true;
  constructor(private router: Router,private loginservice : AuthService) 
  { 
    this.changepwdForm = new FormGroup({
      username : new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace]),
      oldpassword : new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace]),
      newpassword : new FormControl("", [Validators.required,Validators.minLength(8),Customvalidators.notOnlyWhitespace]),
      confirmpassword : new FormControl("", [Validators.required,Validators.minLength(8),Customvalidators.notOnlyWhitespace])
    });
  }

  ngOnInit(): void 
  {
    this.changepwdForm.controls['username'].setValue(sessionStorage.getItem("admin"));
  
  }

  get formControl() {
    return this.changepwdForm.controls;
  }

 
  changepwd()
  {
    this.submitted = true;
    if (this.changepwdForm.valid)
    {
      if(this.changepwdForm.controls['newpassword'].value === this.changepwdForm.controls['confirmpassword'].value)
      {
        this.pwdmismatch =false;
        this.adminCreds.username =this.changepwdForm.controls['username'].value;
        this.adminCreds.pword=this.changepwdForm.controls['oldpassword'].value;
        this.loginservice.authenticate(this.adminCreds).subscribe(
          data  => {
            console.log(data);
            
            if(data === null)
            {
               this.invalidCreds();
            }
            else
            {
              this.invalidLogin = false;
              this.updateCreds.username = this.changepwdForm.controls['username'].value;
              this.updateCreds.pword =  this.changepwdForm.controls['newpassword'].value;
              this.updateCreds.loginid = data.loginid;
              console.log(this.updateCreds.loginid);
              this.loginservice.updateCredentials(this.updateCreds).subscribe(
              resdata => {
                console.log(resdata);
                //alert("Password updated successfully!!Please login using new credentials");
                this.router.navigate(["/login"], {queryParams: {msg: this.success}});
              },
              error => {
                console.log('Got database error while updating credentials',error);
              }
            );
            }
          },
          error => {
            console.log('Got database error while validating credentials',error);
          }
        );
      }
      else
      {
        this.submitted = false;
        this.pwdmismatch = true;
      }
     
    }
  }

  invalidCreds()
  {
    this.submitted = false;
    this.changepwdForm.reset();
    this.invalidLogin = true;
  }
  updatecredents()
  {
    
  }

}
