import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { LoginComponent } from './core/components/login/login.component';
import { LoginASPComponent } from './core/components/login-asp/login-asp.component';
import { SignUpAspComponent } from './core/components/sign-up-asp/sign-up-asp.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ViewOrderComponent } from 'shopping/components/view-order/view-order.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-asp', component: LoginASPComponent },
  { path: 'sign-up-asp', component: SignUpAspComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'my/orders/view-order/:id',
    component: ViewOrderComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
