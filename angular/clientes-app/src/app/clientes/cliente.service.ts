import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente.js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlEndPoint = 'http://localhost:8081/api/clientes';
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    /* CLIENTES converted as stream by using of
    return of(CLIENTES); */
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}
