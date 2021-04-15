import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/_services/news.service';
import { News } from 'src/_models/news.model';
import { NewsInfoSemComponent } from 'src/app/news/news-info-sem/news-info-sem.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-more-news',
  templateUrl: './more-news.component.html',
  styleUrls: ['./more-news.component.css']
})
export class MoreNewsComponent implements OnInit {
   /**
   * Contiene los cursos disponibles
   */
  public _news: Array<News>;

  constructor(
    private newsService:NewsService,
    private modalService: NgbModal) {
    this.setNews()
   }

  ngOnInit() {
  }

  /**
   * Obtiene y setea las noticias
   */
  public async setNews() {
    let res:any = await this.newsService.list().toPromise();
    this._news = new Array<News>();
    
    res.forEach(news => {
      this._news.push(News.fromJSON(news));
    });
  }

  public ShowNews(id: string){
    NewsInfoSemComponent.newsId = id;
    this.modalService.open(NewsInfoSemComponent);
  }

}
