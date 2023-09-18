import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private adminService:AuthService,
    private router: Router
  ){

  }
  canActivate():any{
    if (!this.adminService.isAuthenticated(['ADMIN'])) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
