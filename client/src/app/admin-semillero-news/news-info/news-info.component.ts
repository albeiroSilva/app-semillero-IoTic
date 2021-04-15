import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/_models/news.model';
import { NewsService } from 'src/_services/news.service';
import { NewsSharedService } from 'src/_services/news.shared.service';
import { faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { MsgHelper } from 'src/_helpers/msg.helper';


@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css']
})
export class NewsInfoComponent implements OnInit {
  /**
   * Icono de Cancelar
   */
  public faTimes = faTimes;
  /**
   * Icono de Editar
   */
  public faPen = faPen;
  /**
   * Icono de Actualizar
   */
  public faCheck = faCheck;
  /**
   * ¿Se puede editar el formulario?
   */
  public isEditable: boolean;
  /**
   * Contiene la información de la noticia.
   */
  public news: News;
  /**
   * Identificador de la noticia
   */
  public static id: string;

  constructor(
    private modalContent: NgbActiveModal, 
    private newsService: NewsService,
    private newsSharedService : NewsSharedService) { }

  ngOnInit() {
    this.setNews();
  }
  /**
   * Cierra el modal
   */
  public close() {
    this.modalContent.close();
  }

  /**
   * Setea la información de la noticia
   */
  private async setNews() {
    try {
      let res = await this.newsService.get(NewsInfoComponent.id).toPromise();
      this.news = News.fromJSON(res);
    } catch (err) {
      this.close();
    }
  }

  /**
   * Invacada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.isEditable=false;
    this.setNews();
  }

  /**
   * Invocada al dar click en Actualizar
   */
  public async updateOnClick() {
    try {
      let res = await this.newsService.update(this.news.id, this.news).toPromise();
      this.newsSharedService.update(News.fromJSON(res));
      new MsgHelper().showSuccess("Noticia actualizada exitosamente");
    } catch (err) {
      if (err.status == 422) {
        new MsgHelper().showError(err.error.error);
        this.setNews();
      }
    } finally {
      this.isEditable = false;
    }
  }

}
