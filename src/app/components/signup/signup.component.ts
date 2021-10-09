import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userdetails } from 'src/app/classes/userdetails';
import { AuthService } from 'src/app/services/auth.service';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
  public submitted = false;
  signuperror: boolean = false;
  username : string | any;

  constructor(private router: Router,private regservice : AuthService) 
  { 
    this.signupFormGroup = new FormGroup({
      firstname: new FormControl('', 
                            [Validators.required,
                             Validators.pattern('^[a-zA-Z]*$'), 
                            Customvalidators.notOnlyWhitespace]),

      lastname:  new FormControl('', 
                            [Validators.required, 
                             Validators.pattern('^[a-zA-Z]*$'), 
                             Customvalidators.notOnlyWhitespace]),
      
      contactno: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(10), 
                            Validators.pattern('^[0-9]*$'),
                            Customvalidators.notOnlyWhitespace]),
      emailId: new FormControl('',
                            [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
     /*  payment: new FormControl(''), */
      address: new FormControl('', [Validators.required,Customvalidators.notOnlyWhitespace]), 
      username : new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace]),
      newpassword : new FormControl("", [Validators.required,Customvalidators.notOnlyWhitespace]),
    });
  }

  ngOnInit(): void 
  {
  }

  get formControl() 
  {
    return this.signupFormGroup.controls;
  } 

  register()
  {
    this.submitted = true;
    if (this.signupFormGroup.valid)
    {
      let userdet = new Userdetails();
      
      userdet.firstname = this.signupFormGroup.value.firstname;
      userdet.lastname = this.signupFormGroup.value.lastname;
      userdet.address = this.signupFormGroup.value.address;
      userdet.contactNo = this.signupFormGroup.value.contactno;
      userdet.emailId = this.signupFormGroup.value.emailId;
      userdet.username = this.signupFormGroup.value.username;
      userdet.pword = this.signupFormGroup.value.newpassword;

      this.username = userdet.username;
      console.log(userdet);
          this.regservice.register(userdet).subscribe({
            next: response => {
              console.log(response);
              if(response === null)
              {
                this.submitted = false;
                this.signuperror = true;
                this.signupFormGroup.reset(this.signupFormGroup.value.username);
                this.signupFormGroup.reset(this.signupFormGroup.value.newpassword);
                this.signupFormGroup.reset(this.signupFormGroup.value.firstname);
                this.signupFormGroup.reset(this.signupFormGroup.value.lastname);
                this.signupFormGroup.reset(this.signupFormGroup.value.address);
                this.signupFormGroup.reset(this.signupFormGroup.value.contactno);
                this.signupFormGroup.reset(this.signupFormGroup.value.emailId);
            }
            else
            {
              this.signuperror = false;
              sessionStorage.setItem("loggedIn","true");
              sessionStorage.setItem("user",this.username);
              this.router.navigate(["/foodmenu"]);
            }
              
    
            },
            error: err => {
              console.log(`There was an error: ${err.message}`);
            }
          });
    }
  }
}
