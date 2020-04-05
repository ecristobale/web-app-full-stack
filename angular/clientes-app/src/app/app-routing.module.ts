import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';

const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/page/:page', component: ClientesComponent },
    { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: 'login', component: LoginComponent },
    { path: 'facturas/:id', component: DetalleFacturaComponent },
    { path: 'facturas/form/:clienteId', component: FacturasComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
