import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo = 'Crear cliente';

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
      }
    );
  }

  loadCliente(): void {
    this.activatedRoute.params.subscribe( params => {
      const id = params.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente);
      }
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      jsonResponse => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente actualizado', `${jsonResponse.mensaje}: ${jsonResponse.cliente.nombre}`, 'success');
      }
    );
  }

}
