import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/cartItem';
import { OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(
    private cartService: CartService,
    private foodService: FoodService
  ) {
    foodService.getData().subscribe((data) => {
      const foods = data.foods;
      cartService.addToCart(foods[1]);
      cartService.addToCart(foods[2]);
      cartService.addToCart(foods[3]);
      cartService.addToCart(foods[4]);
      this.setCart();
    });
  }
  ngOnInit() {
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }
}
