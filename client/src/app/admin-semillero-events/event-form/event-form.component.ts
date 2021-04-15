import { Component, OnInit } from '@angular/core';
import { Event } from 'src/_models/event.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/_services/event.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { EventSharedService } from 'src/_services/event.shared.service';
import { FileHelper } from 'src/_helpers/file.helper';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  /**
   * Icono de Fecha
   */
  public faCalendarAlt = faCalendarAlt;
  
  /**
   * Evento a registrar
   */
  public event: Event;

  constructor(
    private modalContent: NgbActiveModal,
    private eventService: EventService,
    private eventsSharedService: EventSharedService,
    private fileHelper: FileHelper
    ) { 
    this.event = new Event();
  }

  ngOnInit() {
  }

  /**
   * Invocada al dar click en Agregar
   */
  public async addOnClick() {
    try {
      let created:any = await this.eventService.create(this.event).toPromise();
      this.eventsSharedService.add(Event.fromJSON(created));
      // Se sube la imagen del evento
      await this.fileHelper.upload(1, created._id);
      this.close();
      new MsgHelper().showSuccess('Evento registrado exitosamente');
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }
  
  /**
   * Invocada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.close();
  }

  /**
   * Cierra el formulario
   */
  private close() {
    this.modalContent.close();
  }
}
