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
  updateProductForm: FormGroup;
  products: any[] = [];
  selectedImage: File | null = null;
  selectedUpdateImage: File | null = null;
  showUpdateModal: boolean = false;

  constructor(private fb: FormBuilder, private datosService: DatosService) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [null]
    });

    this.updateProductForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
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

  openUpdateModal(product: any): void {
    this.showUpdateModal = true;
    this.updateProductForm.setValue({
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      image: null
    });
    this.selectedUpdateImage = null;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
    this.updateProductForm.reset();
    this.selectedUpdateImage = null;
  }

  updateProduct(): void {
    if (this.updateProductForm.invalid) {
      return;
    }

    const formData = this.updateProductForm.getRawValue();
    if (this.selectedUpdateImage) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const updatedProduct = {
          ...formData,
          image: e.target.result
        };

        this.datosService.updateProduct(updatedProduct);
        this.closeUpdateModal();
        this.loadProducts();
      };

      reader.readAsDataURL(this.selectedUpdateImage);
    } else {
      const updatedProduct = { ...formData, image: this.products.find(p => p.id === formData.id).image };
      this.datosService.updateProduct(updatedProduct);
      this.closeUpdateModal();
      this.loadProducts();
    }
  }

  onUpdateImageChange(event: any): void {
    const file = event.target.files[0];
    this.selectedUpdateImage = file ? file : null;
  }
}
