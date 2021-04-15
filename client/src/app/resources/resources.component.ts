import { Component, OnInit } from '@angular/core';
import { Category } from 'src/_models/category.model';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Resource } from 'src/_models/resource.model';
import { ResourceService } from 'src/_services/resource.service';
import { CategoryService } from 'src/_services/category.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceComponent } from '../resource/resource.component';
import { AuthHelper } from 'src/_helpers/auth.helper';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  /**
   * Icono de Categorías
   */
  public faCaretDown = faCaretDown;

  /**
   * Categorías disponibles
   */
  public categories: Array<Category>;

  /**
   * Recursos disponibles
   */
  public resources: Array<Resource>;

  /**
   * Controla el menú se categorías
   */
  private isCollapsed = true;

  /**
   * Identificador de la categoría que se desea visualizar
   */
  private categoryId: string;

  /**
   * Categoría que se desea visualizar
   */
  private category: Category;

  constructor(
    private resourceService: ResourceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { 
    this.route.queryParams.subscribe(params => { 
      this.categoryId = params['c']; 
      this.setCategories();
      this.setResources();
    });
  }

  ngOnInit() {
    if (!AuthHelper.getLoggedUser()) {
      this.router.navigateByUrl("");
    }
  }

  /**
   * Obtiene y setea la categoría que se desea visualizar
   */
  private async setCategory() {
    try {
      let res = await this.categoryService.get(this.categoryId).toPromise();
      this.category = Category.fromJSON(res);
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Obtiene y setea las categorías registradas
   */
  private async setCategories() {
    try {
      this.categories = new Array<Category>();
      let res:any = null;
      if (this.categoryId) {
        this.setCategory();
        res = await this.categoryService.getByParent(this.categoryId).toPromise();
      } else {
        res = await this.categoryService.list().toPromise();
        res = res.filter(cat => cat.parent === null && cat.available);
      }
      res.forEach(cat => { this.categories.push(Category.fromJSON(cat)); });
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Obtiene y setea los recursos registrados
   */
  private async setResources() {
    try {
      let res:any = null;
      if (this.categoryId) { 
        res = await this.resourceService.getByCategory(this.categoryId).toPromise(); 
      }
      if (res != null) { 
        this.resources = new Array<Resource>();
        res.forEach(r => { this.resources.push(Resource.fromJSON(r)); }); 
      }
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Invocada al dar click en un recurso
   * @param id Identificador del Recurso
   */
  private resourceOnClick(id: string) {
    ResourceComponent.resourceId = id;
    this.modalService.open(ResourceComponent);
  }

  /**
   * Invocada al dar click en una categoría
   */
  private categoryOnClick(id: string) {
    this.router.navigate(['/resources'], {queryParams: { 'c': id }})
  }
}
