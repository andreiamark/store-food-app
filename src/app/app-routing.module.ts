import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: 'search/:searchTerm', component: HomeComponentComponent },
  { path: 'details/:id', component: FoodDetailsComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
