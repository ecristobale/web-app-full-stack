import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClientesComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
