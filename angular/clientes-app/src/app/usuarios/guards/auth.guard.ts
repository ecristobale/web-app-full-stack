import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        if (this.isTokenExpired()) {
          this.authService.logout();
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

  isTokenExpired(): boolean {
    let token = this.authService.token;
    let payload = this.authService.obtainPayload(token);
    let nowInSeconds = new Date().getTime() / 1000;
    return (payload.exp < nowInSeconds);
  }
}
