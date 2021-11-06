import { Injectable } from '@angular/core';
import { ServiceItem } from '../models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: ServiceItem[] = [];
  private cart = new BehaviorSubject<ServiceItem[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}

  addCart(item: ServiceItem) {
    this.items = [...this.items, item];
    this.cart.next(this.items);
  }
}
