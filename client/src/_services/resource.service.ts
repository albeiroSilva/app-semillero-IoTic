import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Resource } from 'src/_models/resource.model';
 
@Injectable()
export class ResourceService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'resource';
    }

    /**
     * Registra un nuevo recurso
     * 
     * @param resource Recurso a ser registrado
     */
    create(resource: Resource) {
        return this.http.post(
            this.apiUrl,
            resource.parseToJSON(),
            { headers: this.headers }
        )
    }

    /**
     * Lista los recursos registrados
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        )
    }

    /**
     * Obtiene la información de un recurso
     * @param id Identificador del Recurso
     */
    get(id: string) {
        return this.http.get(
            `${this.apiUrl}/${id}`,
            { headers: this.headers }
        )
    }

    /**
     * Obtiene los recursos pertenecientes a una categoría.
     * @param categoryId Identificador de la categoría
     */
    getByCategory(categoryId: string) {
        return this.http.get(
            `${this.apiUrl}/category/${categoryId}`,
            { headers: this.headers }
        );
    }

    /**
     * Actualiza la información de un recurso
     * @param id Identificador del Recurso
     * @param resource Contiene la información actualizada del recurso
     */
    update(id: string, resource: Resource) {
        return this.http.put(
            `${this.apiUrl}/${id}`,
            resource.parseToJSON(),
            { headers: this.headers }
        )
    }

    /**
     * Elimina un recurso
     * @param id Identificador del Recurso
     */
    delete(id: string) {
        return this.http.delete(
            `${this.apiUrl}/${id}`,
            { headers: this.headers }
        )
    }
}