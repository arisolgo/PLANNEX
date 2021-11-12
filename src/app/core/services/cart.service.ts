import { Injectable } from '@angular/core';
import { ProviderService, ServiceItem } from '../models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: ProviderService[] = [];
  private cart = new BehaviorSubject<ProviderService[]>([]);
  private cartCount = new BehaviorSubject<number>(0);
  cart$ = this.cart.asObservable();

  constructor() {}

  addCartItem(item: ProviderService) {
    this.items = [...this.items, item];
    this.cart.next(this.items);
    this.cartCount.next(this.cartCount.value + 1);
  }

  removeCartItem(item: ProviderService) {
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.cart.next(this.items);
      this.cartCount.next(this.cartCount.value - 1);
    }
  }

  getCartItems() {
    return this.items;
  }

  getCartItemCount() {
    return this.cartCount;
  }
}
