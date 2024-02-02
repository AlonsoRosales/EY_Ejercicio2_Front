import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./pages/auth/layout/layout.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {LayoutComponentHome} from "./pages/proveedor/layout/layout.component";
import {ListaProveedoresComponent} from "./pages/proveedor/lista-proveedores/lista-proveedores.component";
import {NewProveedorComponent} from "./pages/proveedor/new-proveedor/new-proveedor.component";
import {AddProveedorComponent} from "./pages/proveedor/add-proveedor/add-proveedor.component";
import {ScreeningProveedorComponent} from "./pages/proveedor/screening-proveedor/screening-proveedor.component";

const routes: Routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},
    ]
  },
  {
    path: 'home',
    component: LayoutComponentHome,
    children: [
      { path: 'proveedores', component: ListaProveedoresComponent},
      { path: 'proveedores/new', component: AddProveedorComponent},
      { path: 'proveedores/edit/:id', component: NewProveedorComponent,},
      { path: 'proveedores/screening/:entidad/:fuente', component: ScreeningProveedorComponent,},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EyRoutingModule { }
