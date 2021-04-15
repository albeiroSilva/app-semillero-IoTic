import { Component, OnInit } from '@angular/core';
import { Event } from 'src/_models/event.model';
import { EventService } from 'src/_services/event.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  /**
   * ¿Hay eventos disponibles?
   */
  public weHaveEvents: boolean;

  /**
   * Eventos disponibles
   */
  public events: Array<Event>;

  constructor(
    private eventService: EventService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.setEvents().then(() => {
      this.weHaveEvents = this.events.length > 0;
    })
  }

  public showEvent(id: string) {
    EventComponent.EventId = id;
    this.modalService.open(EventComponent);
  }

  /**
   * Obtiene y setea los eventos registrados
   */
  private async setEvents() {
    let res:any = await this.eventService.list().toPromise();
    this.events = new Array<Event>();

    res.forEach(event => {
      this.events.push(Event.fromJSON(event));
    });
  }
}
