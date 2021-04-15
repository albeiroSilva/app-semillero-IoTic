import { Component, OnInit } from '@angular/core';
import { Event } from 'src/_models/event.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/_services/event.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { DateHelper } from 'src/_helpers/date.helper';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  /**
   * Icono de Cerrar
   */
  public faTimes = faTimes;
  
  /**
   * Identificador del evento
   */
  public static EventId: string;

  /**
   * Contiene la información del evento
   */
  public event: Event;

  constructor(
    private modalContent: NgbActiveModal,
    private eventService: EventService,
    private dateHelper: DateHelper
    ) { }

  ngOnInit() {
    this.setEvent();
  }

  /**
   * Obtiene y setea el evento
   */
  private async setEvent() {
    try {
      let res = await this.eventService.get(EventComponent.EventId).toPromise();
      this.event = Event.fromJSON(res);
    } catch(err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Cierra el modal
   */
  close() {
    this.modalContent.close();
  }
}
