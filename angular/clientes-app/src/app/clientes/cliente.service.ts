import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente.js';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    // CLIENTES converted as stream by using of
    return of(CLIENTES);
  }
}
