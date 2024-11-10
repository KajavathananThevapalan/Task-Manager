import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {
  }
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

