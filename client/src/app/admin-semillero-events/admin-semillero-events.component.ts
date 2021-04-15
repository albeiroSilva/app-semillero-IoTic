import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/_services/event.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from './event-form/event-form.component';
import { Event } from 'src/_models/event.model';
import { EventSharedService } from 'src/_services/event.shared.service';
import { EventInfoComponent } from './event-info/event-info.component';

@Component({
  selector: 'app-admin-semillero-events',
  templateUrl: './admin-semillero-events.component.html',
  styleUrls: ['./admin-semillero-events.component.css']
})
export class AdminSemilleroEventsComponent implements OnInit {
  /**
   * Icono de Añadir Evento
   */
  faPlus = faPlus;

  /**
   * Icono de Ver Evento
   */
  faEye = faEye;

  /**
   * Icono de Eliminar Evento
   */
  faTrashAlt = faTrashAlt;

  /**
   * Eventos registrados
   */
  public events: Array<Event>;

  /**
   * ¿Está cargando la petición?
   */
  public isLoading: boolean;

  constructor(
    private modalService: NgbModal, 
    private eventService: EventService,
    private eventSharedService: EventSharedService
    ) { 
  }

  ngOnInit() {
    this.setEvents();
  }

  /**
   * Setea los eventos registrados
   */
  private async setEvents() { 
    try {
      this.isLoading = true;
      let res: any = await this.eventService.list().toPromise();
      this.events = new Array<Event>();
      res.forEach((e: Object) => {
        this.events.push(Event.fromJSON(e));
      }); 
      this.eventSharedService.events = this.events;
      this.isLoading = false;
      this.eventSharedService.refEvents().subscribe(events => this.events = events);
    } catch (err) {
      new MsgHelper().showError(err.error);
      this.isLoading = false;
    }
  }

  public showOnClick(id: string) {
    EventInfoComponent.id = id;
    this.modalService.open(EventInfoComponent);
  }

  public async deleteOnClick(id: string) {
    try {
      let msg = new MsgHelper();
      let res = await msg.showConfirmDialog('¿Está seguro?', 'El evento será eliminado de forma permanente');
      
      if (res.value) {
        try {
          await this.eventService.delete(id).toPromise();
        } catch(err) {
          if (err.status == 200) {
            msg.showSuccess('El evento fue eliminado exitosamente');
            this.setEvents();
            return;
          }
          msg.showError('El evento no pudo ser eliminado');
        }
      }
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Invocada al dar click en Agregar
   */
  public addOnClick() {
    this.modalService.open(EventFormComponent)
  }
}
