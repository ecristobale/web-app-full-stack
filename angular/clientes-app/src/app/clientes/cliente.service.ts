import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { formatDate, DatePipe } from '@angular/common';

import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente.js';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlEndPoint = 'http://localhost:8081/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-type' : 'application/json'});

  constructor(private http: HttpClient,
              private router: Router, private authService: AuthService) { }

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNotAuthorized(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    } else if (e.status == 403) {
      swal.fire('Access denied', `Your user (${this.authService.usuario.username}) is not allowed to access to that content.`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones', {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  getClientes(page: number): Observable<any> {
    /* CLIENTES converted as stream by using of
    return of(CLIENTES); */
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any) => {
        console.log('tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('es');
          // cliente.createdAt = datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy');
          // cliente.createdAt = formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en_US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.addAuthorizationHeader()}).pipe(
      map( (jsonResponse: any) => jsonResponse.cliente as Cliente),
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }
        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        this.router.navigate(['./clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers : this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        if ( e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers : this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  uploadPhoto(photo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', photo);
    formData.append('id', id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true, headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }
}
