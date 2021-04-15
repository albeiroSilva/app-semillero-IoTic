import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/_services/news.service';
import { News } from 'src/_models/news.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/_models/user.model';
import { AuthHelper } from 'src/_helpers/auth.helper';

@Component({
  selector: 'app-news-info-sem',
  templateUrl: './news-info-sem.component.html',
  styleUrls: ['./news-info-sem.component.css']
})
export class NewsInfoSemComponent implements OnInit {
  /**
   * Icono de Cerrar
   */
  faTimes = faTimes;

  /**
   * Identificador del curso.
   */
  public static newsId: string;

  /**
   * Contiene la información del curso.
   */
  public news: News;

  /**
   * Contiene al usuario de la sesión actual.
   */
  public user: User;

  constructor(
    private newsService:NewsService,
    private modal: NgbActiveModal) { }

  ngOnInit() {
    this.setNews();
    this.user = AuthHelper.getLoggedUser();
  }

  /**
   * Cierra el modal
   */
  private close() { this.modal.close(); }

  private async setNews() {
    let res = await this.newsService.get(NewsInfoSemComponent.newsId).toPromise();
    this.news = News.fromJSON(res);
    this.user = AuthHelper.getLoggedUser();
  }

}
