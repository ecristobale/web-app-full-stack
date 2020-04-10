import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import { FacturaService } from 'src/app/facturas/services/factura.service';
import { Factura } from 'src/app/facturas/models/factura';

import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo = 'Detalle del cliente';
  private selectedPhoto: File;
  progress = 0;
  urlBackend: string = URL_BACKEND;

  constructor(private clienteService: ClienteService,
    private modalService: ModalService, private authService: AuthService,
    private facturaService: FacturaService) { }

  ngOnInit() {}

  selectPhoto(event: any) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
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
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notifyUpload.emit(this.cliente);
            swal.fire('La foto se ha subido correctamente', response.mensaje, 'success');
          }
        }
      );
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.selectedPhoto = null;
    this.progress = 0;
  }

  deleteInvoice(factura: Factura): void {
    swal.fire({
      title: 'Estás seguro?',
      text: `La factura: ${factura.descripcion} se eliminará definitivamente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.facturaService.deleteFactura(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(clienteFact => clienteFact !== factura);
            swal.fire('Factura eliminada', `Factura: ${factura.descripcion} eliminada con éxito`, 'success');
          }
        );
      }
    });
  }

}
