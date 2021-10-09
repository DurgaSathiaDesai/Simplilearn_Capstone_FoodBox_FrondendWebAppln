import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddfooditemComponent } from './components/addfooditem/addfooditem.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { CartdetailsComponent } from './components/cartdetails/cartdetails.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { EditfooditemComponent } from './components/editfooditem/editfooditem.component';
import { FoodmenuComponent } from './components/foodmenu/foodmenu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ManagecuisinesComponent } from './components/managecuisines/managecuisines.component';
import { ManagefooditemsComponent } from './components/managefooditems/managefooditems.component';
import { OrdermsgdisplayComponent } from './components/ordermsgdisplay/ordermsgdisplay.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdatefooditemComponent } from './components/updatefooditem/updatefooditem.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,
  children:[
    {path:'main',component:MainComponent},
    {path:'about',component:AboutComponent},
    {path:'contactus',component:ContactusComponent}
  ]},
  {path:'foodmenu',component:FoodmenuComponent},
  {path:'login',component:LoginComponent},
  {path:'cartdetails',component:CartdetailsComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'ordermsg',component:OrdermsgdisplayComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminDashboard',component:AdmindashboardComponent,
  children:[
    {path:'managecuisines',component:ManagecuisinesComponent},
    {path:'changepwd',component:ChangepwdComponent},
    {path:'managefooditems',component:ManagefooditemsComponent,
    children:[
      {path:'addfooditem',component:AddfooditemComponent},
      {path:'updatefooditem',component:UpdatefooditemComponent},
      {path:'editfooditem',component:EditfooditemComponent}
    ]},
  ]},
  {path:'',redirectTo: '/home/about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
