import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token-service';
import { Router } from '@angular/router';
import { ToastService } from './toast-service';
import { TranslationService } from './translation-service';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  httpClient = inject(HttpClient);
  tokenService = inject(TokenService)
  router = inject(Router);
  toastService = inject(ToastService);
  translateService = inject(TranslationService);

  registerUser(name: string, email: string, password: string) {
        this.httpClient.post<{message: string}>('auth/register', {name: name, email: email, password: password})
      .subscribe({
        next: (res) => {
          this.router.navigate(['/authorization/login']);
          this.toastService.add({
            id: crypto.randomUUID(),
            type: 'success',
            message: res.message
          })
        },
        error: (err) => {
          this.toastService.add({
            id: crypto.randomUUID(),
            type: 'error',
            message: err.error.message
          });
        }
      });
  }

  login(email: string, password: string){
      this.httpClient.post<LoginResponse>('auth/login', {email: email, password: password})
    .subscribe({
      next: (res: LoginResponse) => {
        this.tokenService.setToken(res.token);
        this.router.navigate(['/store']);
        this.toastService.add({
          id: crypto.randomUUID(),
          type: 'success',
          message: this.translateService.translate("SUCCESSFULLY_LOGGED_IN")
        })
        
      },
      error: (err) => {
        this.toastService.add({
          id: crypto.randomUUID(),
          type: 'error',
          message: err.error.message
        });
      }
    });
  }

  logout() {
        this.httpClient.post('auth/logout', [])
    .subscribe({
      next: (res) => {
        this.tokenService.clearToken();
         this.toastService.add({
          id: crypto.randomUUID(),
          type: 'success',
          message: this.translateService.translate("SUCCESSFULLY_LOGGED_OUT")
        })
      },
      error: (err) => {
        this.toastService.add({
          id: crypto.randomUUID(),
          type: 'error',
          message: err.error.message
        });
      }
    });

    this.router.navigateByUrl('authorization/login');
  }
}