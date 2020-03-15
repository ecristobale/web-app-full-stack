import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo = 'Detalle del cliente';
  private selectedPhoto: File;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = + params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  selectPhoto(event: any) {
    this.selectedPhoto = event.target.files[0];
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.selectedPhoto = null;
    }
  }

  uploadPhoto() {
    if (!this.selectedPhoto) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.uploadPhoto(this.selectedPhoto, this.cliente.id).subscribe(
        cliente => {
          this.cliente = cliente;
          swal.fire('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.cliente.photo}`, 'success');
        }
      );
    }
  }

}
