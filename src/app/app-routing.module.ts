import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { HomeComponent } from './Components/home/home.component';
import { PagosComponent } from './Components/pagos/pagos.component';
import { ConfirmacionComponent } from './Components/confirmacion/confirmacion.component';

const routes: Routes = [
  { path: 'productos', component: ProductAddComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'checkout', component: PagosComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },



  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
