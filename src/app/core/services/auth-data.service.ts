import { Injectable } from '@angular/core';
import { DataAuth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private storageKey = 'authData';

  setAuthData(data: any) {
    const dataString = JSON.stringify(data);
    localStorage.setItem(this.storageKey, dataString);
  }

  getAuthData() {
    const dataString = localStorage.getItem(this.storageKey);
    return dataString ? JSON.parse(dataString) : null;
  }

  isAuthenticated(): boolean {
    return this.getAuthData() !== null;
  }

  clearAuthData() {
    localStorage.removeItem(this.storageKey);
  }

}
