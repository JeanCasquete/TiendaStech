import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private storageKey = 'products';
  private cartKey = 'cart';
  private cartSubject = new BehaviorSubject<any[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // Productos
  getProducts(): any[] {
    if (this.isBrowser()) {
      const products = localStorage.getItem(this.storageKey);
      return products ? JSON.parse(products) : [];
    }
    return [];
  }

  saveProduct(product: any): void {
    if (this.isBrowser()) {
      const products = this.getProducts();
      products.push(product);
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  updateProduct(updatedProduct: any): void {
    if (this.isBrowser()) {
      let products = this.getProducts();
      products = products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  deleteProduct(productId: string): void {
    if (this.isBrowser()) {
      let products = this.getProducts();
      products = products.filter(product => product.id !== productId);
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  // Carrito
  getCart(): any[] {
    if (this.isBrowser()) {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  addToCart(product: any): void {
    if (this.isBrowser()) {
      const cart = this.getCart();
      const index = cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        cart[index].quantity += product.quantity;
      } else {
        cart.push(product);
      }
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.cartSubject.next(cart);
    }
  }

  removeFromCart(productId: string): void {
    if (this.isBrowser()) {
      let cart = this.getCart();
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.cartSubject.next(cart);
    }
  }

  updateCart(product: any): void {
    if (this.isBrowser()) {
      let cart = this.getCart();
      const index = cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        cart[index].quantity = product.quantity;
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.cartSubject.next(cart);
      }
    }
  }

  getCartTotal(): number {
    if (this.isBrowser()) {
      const cart = this.getCart();
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    return 0;
  }
}
