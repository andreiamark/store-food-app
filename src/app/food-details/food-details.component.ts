import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Food } from '../shared/models/food';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
})
export class FoodDetailsComponent {
  food: Food | undefined;
  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDataById();
  }
  getDataById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foodService
      .displayDataById(id)
      .subscribe((food) => (this.food = food));
  }

  addToCart() {
    this.cartService.addToCart(this.food!);
    this.router.navigateByUrl('/cart-page');
  }
}
