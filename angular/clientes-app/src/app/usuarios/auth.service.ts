import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = URL_BACKEND + '/oauth/token';
    const clientCredentials = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + clientCredentials});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  saveUser(accessToken: string) {
    let payload = this.obtainPayload(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  saveAccessToken(accessToken: string) {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtainPayload(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtainPayload(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    return this.usuario.roles.includes(role);
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    //sessionStorage.clear(); removes everything
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
