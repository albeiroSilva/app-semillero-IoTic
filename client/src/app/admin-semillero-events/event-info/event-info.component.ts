import { Component, OnInit } from '@angular/core';
import { Event } from 'src/_models/event.model';
import { faCalendarAlt, faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/_services/event.service';
import { EventSharedService } from 'src/_services/event.shared.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  /**
   * Icono de Fecha Inicio y Fecha Fin
   */
  public faCalendarAlt = faCalendarAlt;

  /**
   * Icono de Cancelar
   */
  public faTimes = faTimes;

  /**
   * Icono de Actualizar
   */
  public faCheck = faCheck;

  /**
   * Icono de Editar
   */
  public faPen = faPen;

  /**
   * Contiene la información del evento
   */
  public event: Event;

  /**
   * ¿Se puede editar el formulario?
   */
  public isEditable: boolean;

  /**
   * Identificador del curso
   */
  public static id: string;

  constructor(
    private eventService: EventService, 
    private eventSharedService: EventSharedService,
    private modal: NgbActiveModal
    ) { }

  ngOnInit() {
    this.setEvent();
  }

  /**
   * Cierra el modal
   */
  public close() {
    this.modal.close();
  }

  /**
   * Invacada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.isEditable = false;
    this.setEvent();
  }

  /**
   * Obtiene y setea la información del evento.
   */
  private async setEvent() {
    try {
      let res = await this.eventService.get(EventInfoComponent.id).toPromise();
      this.event = Event.fromJSON(res);
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Invocada al dar click en Actualizar
   */
  public async updateOnClick() {
    try {
      let res = await this.eventService.update(this.event.id, this.event).toPromise();
      this.eventSharedService.update(Event.fromJSON(res));
      new MsgHelper().showSuccess("Evento actualizado exitosamente");
    } catch (err) {
      if (err.status == 422) {
        new MsgHelper().showError(err.error.error);
        this.setEvent();
      } else {
        new MsgHelper().showError(err.message);
      }
    } finally {
      this.isEditable = false;
    }
  }
}
