import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usuario = 'admin'; // Nombre de usuario preestablecido
  private readonly contraseña = '123456'; // Contraseña preestablecida

  login(username: string, password: string): boolean {
    // Verificar si el nombre de usuario y la contraseña coinciden con los preestablecidos
    if (username === this.usuario && password === this.contraseña) {
      // Autenticación exitosa
      localStorage.setItem('token', 'jwt-token-preestablecido'); // Simular almacenamiento de token
      return true;
    }
    // Autenticación fallida
    return false;
  }

  logout() {
    // Eliminar el token almacenado
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Verificar si el usuario está autenticado (por ejemplo, si hay un token válido)
    return !!localStorage.getItem('token'); // Verificar si hay un token almacenado
  }
}
