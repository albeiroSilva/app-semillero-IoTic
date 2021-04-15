import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Message } from 'src/_models/message.model';
 
@Injectable()
export class MessageService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'message';
    }

    /**
     * Registra un nuevo mensaje.
     * 
     * @param message mensaje a ser registrado.
     */
    create(message: Message) {
        return this.http.post(
            this.apiUrl, 
            message.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Obtiene todos los mensajes.
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        );
    }

    /**
     * Elimina un mensaje.
     */
    delete(id: string) {
        return this.http.delete(
            this.apiUrl + `/${id}`,
            { headers: this.headers }
        );
    }
}