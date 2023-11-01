import { Component, OnInit } from '@angular/core';
import { AuthApiService } from './services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authApiService: AuthApiService, private router: Router, private fb: FormBuilder) {}
  public loginForm!: FormGroup;
  public value!: string;
  public showPassword: boolean = false;
  public credentialsInvalid: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.checkCredentials();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      nick_usu: ['', [Validators.required]],
      contra_usu: ['', [Validators.required]]
    })
  }

  checkCredentials(): void {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    this.authApiService.verifyToken(token).subscribe({
      next: (data) => {
        this.router.navigate(['home'])
      }
    })
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authApiService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.credentialsInvalid = false;
        sessionStorage.setItem('token', data.Resp.data.token);
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.credentialsInvalid = true;
        console.log(error.error.Resp.message)
      }
    })
  }
}
