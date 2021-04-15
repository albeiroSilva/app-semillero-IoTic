import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUsers, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/_services/auth.service';
import { AuthHelper } from 'src/_helpers/auth.helper';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * Icono del Correo
   */
  faUsers = faUsers;

  faSignInAlt = faSignInAlt;

  /**
   * Formulario de Inicio de Sesión
   */
  loginForm: FormGroup;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    // Si ya hay una sesión iniciada, se redirige al 'home'
    if (AuthHelper.getLoggedUser()) {
      this.router.navigateByUrl("home");
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls }

  public logoOnClick() {
    this.router.navigateByUrl("home");
  }

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let msg = new MsgHelper();
    try {
      let res = await this.authService.login(email, password).toPromise();

      // Se inicia la sesión
      AuthHelper.setLoggedUser(res);
      msg.showSuccess('Bienvenido');

      // Se redirige al usuario al "home"
      this.router.navigateByUrl("home");
    } catch (err) {
      let err_msg = '';

      if (err.status == 0) { 
        err_msg = 'No fue posible establecer una conexión con el servidor'; 
      } else {
        err_msg = err.error.error;
      }

      msg.showError(err_msg);
    }
  }
}
