import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Event } from 'src/_models/event.model';
 
@Injectable()
export class EventService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'event';
    }

    /**
     * Obtiene los eventos registrados.
     * 
     */
    create(event: Event) {
        return this.http.post(
            this.apiUrl,
            event.parseToJSON(),
            { headers: this.headers }
        )
    }

    /**
     * Actualiza un evento.
     * 
     * @param id identificador del evento.
     * @param event Contiene la información actualizada del evento
     */
    update(id: string, event: Event) {
        return this.http.put(
            `${this.apiUrl}/${id}`,
            event.parseToJSON(),
            { headers: this.headers }
        )
    }

    /**
     * Obtiene un evento
     * @param id Identificador del evento
     */
    get(id: string) {
        return this.http.get(
            `${this.apiUrl}/${id}`,
            { headers: this.headers }
        )
    }

    /**
     * Obtiene los eventos registrados.
     * 
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        )
    }

    /**
     * Elimina un evento.
     * 
     * @param id identificador del evento.
     */
    delete(id: string) {
        return this.http.delete(
            `${this.apiUrl}/${id}`,
            { 
                headers: this.headers
            },
        );
    }
}