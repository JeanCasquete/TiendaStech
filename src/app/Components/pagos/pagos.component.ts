import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatosService } from '../Services/Datos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})

export class PagosComponent implements OnInit, OnDestroy {
  cart: any[] = [];
  cartTotal: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    // Suscribirse a los cambios en el carrito
    this.cartSubscription = this.datosService.cart$.subscribe(cart => {
      this.cart = cart;
      this.cartTotal = this.datosService.getCartTotal();
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción cuando el componente se destruya
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
