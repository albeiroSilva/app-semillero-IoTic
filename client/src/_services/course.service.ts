import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Course } from '../_models/course.model';
 
@Injectable()
export class CourseService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'course';
    }

    /**
     * Registra un nuevo curso.
     * 
     * @param course curso a ser registrado.
     */
    create(course: Course) {
        return this.http.post(
            this.apiUrl, 
            course.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Obtiene los cursos.
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        );
    }

    /**
     * Obtiene un curso.
     * 
     * @param id identificador del curso.
     */
    get(id: string) {
        return this.http.get(
            `${this.apiUrl}/${id}`,
            { 
                headers: this.headers
            },
        );
    }

    /**
     * Elimina un curso.
     * 
     * @param id identificador del curso.
     */
    delete(id: string) {
        return this.http.delete(
            `${this.apiUrl}/${id}`,
            { 
                headers: this.headers
            },
        );
    }

    /**
     * Actualiza un curso.
     * 
     * @param id identificador del curso.
     * @param course Contiene la información actualizada del curso
     */
    update(id: string, course: Course) {
        return this.http.put(
            `${this.apiUrl}/${id}`,
            course.parseToJSON(),
            { headers: this.headers },
        );
    }
}