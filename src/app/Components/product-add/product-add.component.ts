import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosService } from '../Services/Datos.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  products: any[] = [];
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private datosService: DatosService) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct(): void {
    if (this.productForm.invalid || !this.selectedImage) {
      return;
    }

    const formData = this.productForm.value;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const product = {
        ...formData,
        image: e.target.result
      };

      this.datosService.saveProduct(product);
      this.productForm.reset();
      this.selectedImage = null;
      this.loadProducts();
    };

    reader.readAsDataURL(this.selectedImage);
  }

  loadProducts(): void {
    this.products = this.datosService.getProducts();
  }

  deleteProduct(index: number): void {
    const productId = this.products[index].id;
    this.datosService.deleteProduct(productId);
    this.loadProducts();
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = file ? file : null;
  }
}
