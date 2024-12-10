import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AddCartComponent } from './Components/add-cart/add-cart.component';
import { DetailsComponent } from './Components/details/details.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { SuccessfulComponent } from './Components/successful/successful.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'addcart',component:AddCartComponent},
    {path:'details',component:DetailsComponent},
    {path:'confirmation',component:ConfirmationComponent},
    {path:'success',component:SuccessfulComponent}
];
