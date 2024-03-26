import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = 
[ 
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  }, 
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  }, 
  { 
    path: 'products', 
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) 
  },
  {
    path : "order/:id", 
    component : OrderComponent
  },
  {
    path : "vieworder",
    component : ViewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
