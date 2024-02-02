import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./pages/auth/layout/layout.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {LayoutComponentHome} from "./pages/proveedor/layout/layout.component";
import {ListaProveedoresComponent} from "./pages/proveedor/lista-proveedores/lista-proveedores.component";
import {NewProveedorComponent} from "./pages/proveedor/new-proveedor/new-proveedor.component";
import {AddProveedorComponent} from "./pages/proveedor/add-proveedor/add-proveedor.component";
import {ScreeningProveedorComponent} from "./pages/proveedor/screening-proveedor/screening-proveedor.component";
import {AuthGuard} from "../data/guards/AuthGuard";
import {LoginGuard} from "../data/guards/LoginGuard";

const routes: Routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    ]
  },
  {
    path: 'home',
    component: LayoutComponentHome,
    children: [
      { path: 'proveedores', component: ListaProveedoresComponent, canActivate: [AuthGuard]},
      { path: 'proveedores/new', component: AddProveedorComponent, canActivate: [AuthGuard]},
      { path: 'proveedores/edit/:id', component: NewProveedorComponent, canActivate: [AuthGuard]},
      { path: 'proveedores/screening/:entidad/:fuente', component: ScreeningProveedorComponent,},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EyRoutingModule { }
