import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo = 'Crear cliente';
  regiones: Region[];

  private errores: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadCliente();
    this.clienteService.getRegiones().subscribe( regiones => this.regiones = regiones );
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
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
    this.cliente.facturas = null;
    this.clienteService.update(this.cliente).subscribe(
      jsonResponse => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente actualizado', `${jsonResponse.mensaje}: ${jsonResponse.cliente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  compareRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined ) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
