import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log('tap 3 - Cliente Component');
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Estás seguro?',
      text: `El cliente ${cliente.nombre} ${cliente.apellido} se eliminará definitivamente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire('Cliente eliminado', `Cliente ${cliente.nombre} eliminado con éxito`, 'success');
          }
        );
      }
    })
  }

}
