import { Component, OnInit } from '@angular/core';
import { DatosService } from '../Services/Datos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.products = this.datosService.getProducts();
  }

  addToCart(product: any): void {
    this.datosService.addToCart({ ...product, quantity: 1 });
  }
}
