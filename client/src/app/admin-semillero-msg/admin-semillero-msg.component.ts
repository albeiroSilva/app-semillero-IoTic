import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/_services/message.service';
import { Message } from 'src/_models/message.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DateHelper } from 'src/_helpers/date.helper';

@Component({
  selector: 'app-admin-semillero-msg',
  templateUrl: './admin-semillero-msg.component.html',
  styleUrls: ['./admin-semillero-msg.component.css']
})
export class AdminSemilleroMsgComponent implements OnInit {
  /**
   * Icono de Ver Mensaje
   */
  faEye = faEye;

  /**
   * Icono de Eliminar Mensaje
   */
  faTrashAlt = faTrashAlt;

  /**
   * Mensajes
   */
  public messages: Array<Message>;

  /**
   * ¿Hay mensajes?
   */
  public weHaveMessages: boolean;

  constructor(private messageService: MessageService, private dateHelper: DateHelper) { 
    this.setMessages();
  }

  ngOnInit() {
  }

  /**
   * Obtiene y seta los mensajes recibidos
   */
  public async setMessages() {
    let res = await this.messageService.list().toPromise();
    let messages_list = res as Array<any>;
    this.messages = new Array<Message>();

    messages_list.forEach(msg => {
      this.messages.push(Message.fromJSON(msg));
    });

    this.weHaveMessages = this.messages.length > 0;
  }

  /**
   * Identificador del mensaje
   * @param id Identificador del mensaje
   */
  public async deleteOnClick(id: string) {
    let msg = new MsgHelper();

    let res = await msg.showConfirmDialog('¿Está seguro?', 'El mensaje será eliminado permanentemente');
    if (res.value) {
      try {
        await this.messageService.delete(id).toPromise();
      } catch(err) {
        if (err.status == 200) {
          msg.showSuccess('El mensaje fue eliminado exitosamente');
          this.setMessages();
          return;
        }
        msg.showError('El mensaje no pudo ser eliminado');
      }
    }
  }
}
