import { Component, OnInit } from '@angular/core';
import { FacturaService } from './services/factura.service';
import { Factura } from './models/factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {
  factura: Factura;
  titulo = 'Factura';

  constructor(private facturaService: FacturaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.keys[0]);
      console.log(params.get('id'));
      console.log(params.get(params.keys[0]));
      console.log(params.getAll);
      console.log(params.get['params']);
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    });
  }

}
