import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo = 'Iniciar sesión';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `You are signed in as: ${this.authService.usuario.username}`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error login', 'Username and password cannot be empty', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.saveUser(response.access_token);
      this.authService.saveAccessToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      swal.fire('Login', `Bienvenido ${usuario.username}`, 'success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error login', 'Username or password invalid!', 'error');
      }
    });
  }

}
