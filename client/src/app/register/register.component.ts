import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUser, faEnvelope, faCalendarAlt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../_services/user.service';
import { User } from 'src/_models/user.model';

import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * Icono nombre
   */
  public faUser = faUser;

  /**
   * Icono correo
   */
  public faEnvelope = faEnvelope;

  /**
   * Icono calendario
   */
  public faCalendarAlt = faCalendarAlt;

  /**
   * Icono semester
   */
  public faGraduationCap = faGraduationCap;

  /**
   * Formulario de registro
   */
  private registerForm: FormGroup; 

  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      career: ['', Validators.required],
      birth_date: ['', Validators.required],
      student: [false, Validators.required], 
      semester: [1, [Validators.min(1), Validators.max(10)]]
    });

    this.setBirthDateInitialValue();
  }

  /**
   * Inicializa la fecha de nacimiento
   */
  private setBirthDateInitialValue(): void {
    this.f.birth_date.setValue(new NgbDate(null, null, null));
  }

  studentOnChange(): void {
    this.f.student.setValue(!this.f.student.value);
  }

  /**
   * Para acceder a los atributos del formulario de una manera más simple
   */
  get f() { return this.registerForm.controls; }

  public logoOnClick() { this.router.navigateByUrl("home"); }

  async onSubmit() {
    this.submitted = true;
    // Si el formulario es inválido, no se registra el usuario
    if (this.registerForm.invalid) { return; }

    let newUser = new User(
      '',
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.phone = parseInt(this.registerForm.value.phone, 10),
      this.registerForm.value.career,
      this.registerForm.value.birth_date = new Date().toISOString().slice(0,10), //TODO La fecha no la guarda bien
      this.registerForm.value.student,
      this.registerForm.value.semester,
      false
      /**
       * TODO:  - Agregar los campos: 'Hoja de vida' y  'CVLAC'.
       *        - Utilizar el servicio 'userService' para registar al nuevo usuario.
       */
    );

    let res = await this.userService.create(newUser).toPromise();
    let msg = new MsgHelper();
    msg.showSuccess('Tu solicitud ha sido registrada correctamente, te enviaremos un mensaje a tu correo cuando aceptemos tu solicitud');
    this.router.navigateByUrl("home");
  }
}
