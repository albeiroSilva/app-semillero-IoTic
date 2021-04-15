import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Vision } from '../_models/vision.model';
 
@Injectable()
export class VisionService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'vision';
    }

    /**
     * Registra la visión del semillero.
     * 
     * @param vision visión a ser registrada.
     */
    createVision(vision: Vision) {
        return this.http.post(
          `${this.apiUrl}/create`, 
            vision.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Actualiza la visión del semillero.
     * 
     * @param id identificador de la visión.
     * @param vision Contiene la información actualizada de la visión del semillero.
     */
    updateVision(id: string, vision: Vision) {
      return this.http.put(
          `${this.apiUrl}/update`,
          vision.parseToJSON(),
          { headers: this.headers },
      );
  }

    /**
     * Obtiene la visión del semillero.
     */
    listVision() {
        return this.http.get(
          `${this.apiUrl}/get`,
            { headers: this.headers }
        );
    }
}