import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    let role = next.data.role as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal.fire('Access denied', `Your user (${this.authService.usuario.username}) is not allowed to access to that content.`, 'warning');
    this.router.navigate(['/clientes']);
    return false;
  }
}
