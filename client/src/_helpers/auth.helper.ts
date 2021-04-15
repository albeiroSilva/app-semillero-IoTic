import * as jwt_decode from 'jwt-decode';
import { User } from '../_models/user.model';

export class AuthHelper {
    /**
     * Obtiene el usuario de la sesión actual. 
     */
    public static getLoggedUser(): User {
        let token = localStorage.getItem('token');
        if (!token) { return null; }
        return User.fromJSON(jwt_decode(token));
    }

    /**
     * Retorna el token de la sesión actual.
     */
    public static getToken(): string {
        return localStorage.getItem('token');
    }

    /**
     * Setea el usuario de la sesión actual.
     * 
     * @param res respuesta del servidor al iniciar sesión. Contiene el token.
     */
    public static setLoggedUser(res): void {
        localStorage.setItem('token', JSON.stringify(res.token));
    }   
}