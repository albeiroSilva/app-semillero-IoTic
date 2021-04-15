import { Component, OnInit } from '@angular/core';
import { Category } from 'src/_models/category.model';
import { faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/_services/category.service';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {
  /**
   * Identificador de la Categoría
   */
  public static categoryId;

  /**
   * Icono de Cancelar
   */
  public faTimes = faTimes;

  /**
   * Icono de Actualizar
   */
  public faCheck = faCheck;

  /**
   * Icono de Editar
   */
  public faPen = faPen;

   /**
    * Contiene la información de la Categoría
    */
  public category: Category;

  /**
   * ¿Se puede editar el formulario?
   */
  public isEditable: boolean;

  /**
   * Formulario de Categoría
   */
  private categoryForm: FormGroup;

  /**
   * ¿La categoría se encuentra disponible?
   */
  private isAvailable: boolean;

  /**
   * ¿Pertenece a otra categoría?
   */
  private question: boolean;

  /**
   * Categoría a la que pertenece
   */
  private parent: Category;

  /**
   * Contiene las categorías registradas
   */
  private categories: Array<Category>;

  constructor(
    private fromBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private categoryService: CategoryService
  ) { 
    this.categoryForm = this.fromBuilder.group({
      name: ['', Validators.required]
    });
    this.setCategory();
  }

  ngOnInit() {
  }

  get f() { return this.categoryForm.controls; }

  /**
   * Obtiene y setea la categoría actual junto con las demás registradas
   */
  private async setCategory() {
    try {
      let res: any = await this.categoryService.get(CategoryInfoComponent.categoryId).toPromise();
      this.category = Category.fromJSON(res);
      this.f.name.setValue(this.category.name);
      this.isAvailable = this.category.available;
      this.parent = this.category.parent;
      if (this.category.parent != null) { this.question = true; }

      res = await this.categoryService.list().toPromise();
      this.categories = new Array<Category>();
      res.forEach(cat => { this.categories.push(Category.fromJSON(cat)); });
      this.categories = this.categories.filter(cat => cat.id != this.category.id);
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Cierra el modal
   */
  public close() {
    this.modal.close();
  }

  /**
   * Invocada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.setCategory();
    this.isEditable = !this.isEditable;
  }

  /**
   * Invocada al dar clik en Actualizar
   */
  public async updateOnClick() {
    try {
      this.category.name = this.f.name.value;
      this.category.parent = this.question ? this.parent : null;
      this.category.available = this.isAvailable;
      let res = await this.categoryService.update(CategoryInfoComponent.categoryId, this.category).toPromise();
      this.close();
      new MsgHelper().showSuccess('La categoría ha sido acutalizada exitosamente');
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }
}
