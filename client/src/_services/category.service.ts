import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Category } from 'src/_models/category.model';
 
@Injectable()
export class CategoryService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'category';
    }

    /**
     * Registra una nueva categoría.
     * 
     * @param category categoría a ser registrada.
     */
    create(category: Category) {
        return this.http.post(
            this.apiUrl, 
            category.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Lista las categorías registradas.
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        );
    }

    /**
     * Lista las categorías registradas.
     * @param id Identificador de la categoría
     */
    delete(id: string) {
        return this.http.delete(
            `${this.apiUrl}/${id}`,
            { headers: this.headers }
        );
    }

    /**
     * Obtiene una categoría.
     * @param id Identificador de la categoría
     */
    get(id: string) {
        return this.http.get(
            `${this.apiUrl}/${id}`,
            { headers: this.headers }
        );
    }

    /**
     * Actualiza una categoría.
     * @param id Identificador de la categoría
     * @param category Categoría actualizada
     */
    update(id: string, category: Category) {
        return this.http.put(
            `${this.apiUrl}/${id}`,
            category.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Obtiene las categorías pertenecientes a una categoría.
     * @param categoryId Identificador de la categoría padre
     */
    getByParent(parentId: string) {
        return this.http.get(
            `${this.apiUrl}/parent/${parentId}`,
            { headers: this.headers }
        );
    }
}