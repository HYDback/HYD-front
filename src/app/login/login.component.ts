import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = false;

  constructor(private authService: AuthService, private route: Router) {}

  login() {
    const authenticated = this.authService.login(this.username, this.password);
    console.log(authenticated);
    console.log(this.username);
    console.log(this.password);
    if (authenticated) {
      this.route.navigate(["menu"])
    } else {
      // Autenticación fallida, mostrar un mensaje de error
      this.error = true;
    }
  }
}
