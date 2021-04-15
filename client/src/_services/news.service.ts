import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { News } from '../_models/news.model';

@Injectable()
export class NewsService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += 'news';
  }
  /**
     * Registra una nueva noticia.
     * 
     * @param news curso a ser registrado.
     */
    create(news: News) {
      return this.http.post(
          this.apiUrl, 
          news.parseToJSON(),
          { headers: this.headers }
      );
    }

    /**
     * Obtiene las noticias.
     */
    list() {
      console.log(this.apiUrl);
      return this.http.get(
          this.apiUrl,
          { headers: this.headers }
      );
    }

    /**
     * Obtiene una noticia.
     * 
     * @param id identificador de la noticia.
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
     * Elimina una noticia.
     * 
     * @param id identificador de la noticia.
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
     * Actualiza una noticia.
     * 
     * @param id identificador de la noticia.
     * @param news Contiene la información actualizada de la noticia
     */
    update(id: string, news: News) {
      return this.http.put(
          `${this.apiUrl}/${id}`,
          news.parseToJSON(),
          { headers: this.headers },
      );
  }
}
