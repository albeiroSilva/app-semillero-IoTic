import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Mission } from '../_models/mission.model';
 
@Injectable()
export class MissionService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'mission';
    }

    /**
     * Registra la misión del semillero.
     * 
     * @param mission misión a ser registrada.
     */
    createMission(mission: Mission) {
        return this.http.post(
          `${this.apiUrl}/create`, 
            mission.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Actualiza la misión del semillero.
     * 
     * @param id identificador de la misión.
     * @param mission Contiene la información actualizada de la misión del semillero.
     */
    updateMission(id: string, mission: Mission) {
      return this.http.put(
          `${this.apiUrl}/update`,
          mission.parseToJSON(),
          { headers: this.headers },
      );
  }

    /**
     * Obtiene la misión del semillero.
     */
    listMission() {
        return this.http.get(
          `${this.apiUrl}/get`,
            { headers: this.headers }
        );
    }
}