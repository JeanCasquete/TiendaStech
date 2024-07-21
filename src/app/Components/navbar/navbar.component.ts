import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatosService } from '../Services/Datos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cart: any[] = [];
  cartTotal: number = 0;
  cartOpen = false;
  cartChanged = false; // Variable para animación
  private cartSubscription: Subscription | undefined;

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.cartSubscription = this.datosService.cart$.subscribe(cart => {
      this.cart = cart;
      this.cartTotal = this.datosService.getCartTotal();
      this.cartChanged = true; // Activar animación
      setTimeout(() => this.cartChanged = false, 1000); // Desactivar animación después de 1 segundo
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeFromCart(productId: string): void {
    this.datosService.removeFromCart(productId);
  }

  updateQuantity(product: any, quantity: number): void {
    product.quantity = quantity;
    this.datosService.updateCart(product);
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }
}
