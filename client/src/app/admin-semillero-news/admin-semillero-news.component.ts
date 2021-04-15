import { Component, OnInit } from '@angular/core';
import { News } from 'src/_models/news.model';
import { NewsService } from 'src/_services/news.service';
import { faPlus, faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { NewsSharedService } from 'src/_services/news.shared.service';
import { NewsInfoComponent } from 'src/app/admin-semillero-news/news-info/news-info.component';
import { NewsFormComponent } from 'src/app/admin-semillero-news/news-form/news-form.component';

@Component({
  selector: 'app-admin-semillero-news',
  templateUrl: './admin-semillero-news.component.html',
  styleUrls: ['./admin-semillero-news.component.css']
})
export class AdminSemilleroNewsComponent implements OnInit {

  /**
   * Icono de Añadir Noticia
   */
  faPlus = faPlus;

  /**
   * Icono de Ver Noticia
   */
  faEye = faEye;


  /**
   * Icono de Editar Noticia
   */
  faPen = faPen;

  /**
   * Icono de Eliminar Noticia
   */
  faTrashAlt = faTrashAlt;

  /**
   * Contiene todas las noticias
   */
  public news: Array<News>;

  /**
   * ¿Hay noticias registradas?
   */
  public weHaveNews: boolean;

  constructor(
    private newsService: NewsService,
    private modalService: NgbModal,
    private newsSharedService: NewsSharedService
    ) { }

  ngOnInit() {
    this.setNews().then(() => {
      this.newsSharedService.news = this.news;
      this.weHaveNews = this.newsSharedService.news.length > 0;
    });
    this.newsSharedService.refNews().subscribe(news => this.news = news);
  }

  public async setNews() {
    let res:any = await this.newsService.list().toPromise();
    this.news = new Array<News>();

    res.forEach(news => {
      this.news.push(News.fromJSON(news))
    });
  }

  public async addOnClick() {
    this.modalService.open(NewsFormComponent);
  }

  public showOnClick(id: string) {
    NewsInfoComponent.id = id;
    this.modalService.open(NewsInfoComponent);
  }

  public async deleteOnClick(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('Confirmación', '¿Está seguro que desea eliminar la noticia?');
    
    if (res.value) {
      try {
        await this.newsService.delete(id).toPromise();
      } catch(err) {
        if (err.status == 200) {
          msg.showSuccess('La noticia fue eliminada exitosamente');
          this.setNews();
          return;
        }
        msg.showError('La noticia no pudo ser eliminada');
      }
    }
  }

}
