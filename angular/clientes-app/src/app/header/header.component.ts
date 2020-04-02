import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Web App Angular & Spring';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `${username} ha cerrado sesión con éxito`, 'success');
    this.router.navigate(['/login']);
  }

}
