import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PagosComponent } from './Components/pagos/pagos.component';
import { ConfirmacionComponent } from './Components/confirmacion/confirmacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    HomeComponent,
    NavbarComponent,
    PagosComponent,
    ConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
