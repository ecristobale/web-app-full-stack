import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';

const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/form', component: FormComponent },
    { path: 'clientes/form/:id', component: FormComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
