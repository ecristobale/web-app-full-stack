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
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error login', 'Username o password vacíos', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split('.')[1]))
      console.log(payload);
      this.router.navigate(['/clientes']);
      swal.fire('Login', `Bienvenido ${payload.user_name}`, 'success');
    });
  }

}
