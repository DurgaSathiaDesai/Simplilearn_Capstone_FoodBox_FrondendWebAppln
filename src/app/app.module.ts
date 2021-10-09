import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FoodmenuComponent } from './components/foodmenu/foodmenu.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { MainComponent } from './components/main/main.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AuthService } from './services/auth.service';
import { CuisineService } from './services/cuisine.service';
import { ManagecuisinesComponent } from './components/managecuisines/managecuisines.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManagefooditemsComponent } from './components/managefooditems/managefooditems.component';
import { AddfooditemComponent } from './components/addfooditem/addfooditem.component';
import { UpdatefooditemComponent } from './components/updatefooditem/updatefooditem.component';
import { EditfooditemComponent } from './components/editfooditem/editfooditem.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { OrderModule } from 'ngx-order-pipe';
import { FooditemService } from './services/fooditem.service';
import { CartService } from './services/cart.service';
import { CartdetailsComponent } from './components/cartdetails/cartdetails.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { CommonService } from './services/common.service';
import { OrdermsgdisplayComponent } from './components/ordermsgdisplay/ordermsgdisplay.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FoodmenuComponent,
    LoginComponent,
    AdmindashboardComponent,
    SignupComponent,
    AboutComponent,
    MainComponent,
    ContactusComponent,
    ManagecuisinesComponent,
    ManagefooditemsComponent,
    AddfooditemComponent,
    UpdatefooditemComponent,
    EditfooditemComponent,
    ChangepwdComponent,
    CartdetailsComponent,
    CheckoutComponent,
    OrdermsgdisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    OrderModule,
    HttpClientModule
  ],
  providers: [AuthService,CuisineService,FooditemService,CartService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
