import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly STORAGE_KEY = 'plannerAuthToken';

  private token: WritableSignal<string> = signal<string>(
    localStorage.getItem(this.STORAGE_KEY) || ''
  );

  setToken(token: string): void {
    this.token.set(token);
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  clearToken(): void {
    this.token.set('');
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getToken(): string {
    return this.token();
  }
}