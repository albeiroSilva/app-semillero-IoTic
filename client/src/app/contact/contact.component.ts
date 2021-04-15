import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faEnvelope, faUser, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/_services/message.service';
import { Message } from 'src/_models/message.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  faPaperPlane = faPaperPlane;
    /**
   * Icono del nombre
   */
  faUser = faUser;

    /**
   * Icono del Correo
   */
  faEnvelope = faEnvelope;

  /**
   * Icono del Correo
   */
  faPhone = faPhone;

  /**
   * Formulario de contacto
   */
  contactForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      sender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  /**
   * Para acceder a los atributos del formulario de una manera más simple
   */
  get f() { return this.contactForm.controls; }

  async onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) { return; }

    let message = new Message();
    message.sender = this.contactForm.value.sender;
    message.email = this.contactForm.value.email;
    message.phoneNumber = this.contactForm.value.phone_number;
    message.message = this.contactForm.value.message;

    let msg = new MsgHelper();
    try {
      await this.messageService.create(message).toPromise();
      msg.showSuccess('El mensaje ha sido enviado exitosamente');
      this.router.navigateByUrl("home");
    } catch(err) {
      msg.showError('El mensaje no pudo ser enviado');
    }
  }
}
