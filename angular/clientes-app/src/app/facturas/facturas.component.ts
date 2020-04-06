import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemFactura } from './models/item-factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {
  titulo = 'Nueva Factura';
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private facturaService: FacturaService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.productFilter(filterValue);
  }

  showProductName(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  productSelected(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.itemExists(producto.id)) {
      this.incrementQuantity(producto.id);
    } else {
      let itemFactura = new ItemFactura();
      itemFactura.producto = producto;
      this.factura.itemsFactura.push(itemFactura);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updateQuantity(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    this.factura.itemsFactura = this.factura.itemsFactura.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  itemExists(id: number): boolean {
    let exist = false;
    this.factura.itemsFactura.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        exist = true;
      }
    });
    return exist;
  }

  incrementQuantity(id: number) {
    this.factura.itemsFactura = this.factura.itemsFactura.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

}
