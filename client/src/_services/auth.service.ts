import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
 
@Injectable()
export class AuthService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'auth';
    }

    /**
     * Inicia una nueva sesión.
     * 
     * @param email e-mail del usuario
     * @param password contraseña del usuario
     */
    login(email: string, password: string) {
        return this.http.post(
            this.apiUrl,
            {
                email: email,
                password: password
            },
            { headers: this.headers }
        )
    }

    /**
     * Cierra la sesión del usuario actual.
     */
    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}