import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EyRoutingModule } from './ey-routing.module';
import { LoginComponent } from './pages/auth/login/login.component';
import {LayoutComponent} from "./pages/auth/layout/layout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { ListaProveedoresComponent } from './pages/proveedor/lista-proveedores/lista-proveedores.component';
import { NewProveedorComponent } from './pages/proveedor/new-proveedor/new-proveedor.component';
import {LayoutComponentHome} from "./pages/proveedor/layout/layout.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { AddProveedorComponent } from './pages/proveedor/add-proveedor/add-proveedor.component';
import { ScreeningProveedorComponent } from './pages/proveedor/screening-proveedor/screening-proveedor.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LayoutComponentHome,
    LoginComponent,
    ListaProveedoresComponent,
    NewProveedorComponent,
    AddProveedorComponent,
    ScreeningProveedorComponent,
  ],
    imports: [
        CommonModule,
        EyRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
    ]
})
export class EyModule { }
