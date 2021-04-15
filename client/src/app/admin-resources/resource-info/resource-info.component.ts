import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from 'src/_services/resource.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { Resource } from 'src/_models/resource.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/_models/category.model';
import { CategoryService } from 'src/_services/category.service';

@Component({
  selector: 'app-resource-info',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css']
})
export class ResourceInfoComponent implements OnInit {
  /**
   * Icono de Cerrar
   */
  private faTimes = faTimes;

  /**
   * Icono de Cerrar
   */
  private faPen = faPen;

  /**
   * Icono de Cerrar
   */
  private faCheck = faCheck;

  /**
   * Identificador del recurso
   */
  public static resourceId: string;

  /**
   * Contiene la información del Recurso
   */
  private resource: Resource;

  /**
   * Formualrio del Recurso
   */
  private resourceForm: FormGroup;

  /**
   * ¿Se puede editar el recurso?
   */
  private isEditable: boolean;

  /**
   * ¿El recurso se encuentra disponible?
   */
  private isAvailable: boolean;

  /**
   * Contiene las categorías registradas 
   */
  private categories: Array<Category>;

  /**
   * ¿Se ha dado click en actualizar?
   */
  private submitted: boolean;

  constructor(
    private modal: NgbActiveModal,
    private resourceService: ResourceService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.resourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [null, Validators.required],
      category: [null]
    });
    this.setResource();
    this.setCategories();
  }

  /**
   * Cierra el modal
   */
  private close() { this.modal.close(); }

  /**
   * Invocada al dar click en Cancelar
   */
  private cancelOnClick() {
    this.isEditable = false;
    this.setResource();
  }

  /**
   * Invocada al modificar la disponibilidad del recurso
   */
  private availableChange() {
    this.isAvailable = !this.isAvailable;
  }

  /**
   * Invocada al dar click en Actualizar
   */
  private async updateOnClick() {
    this.submitted = true;
    try {
      let resource = new Resource();
      resource.name = this.resourceForm.controls.name.value;
      resource.description = this.resourceForm.controls.description.value;
      resource.quantity = this.resourceForm.controls.quantity.value;
      resource.available = this.isAvailable;
      resource.category = Category.fromJSON(this.resourceForm.controls.category.value);

      let res = await this.resourceService.update(ResourceInfoComponent.resourceId, resource).toPromise();
      new MsgHelper().showSuccess('El recurso ha sido actualizado exitosamente');
      this.close();
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Obtiene y setea la información del recurso
   */
  private async setResource() {
    try {
      let res = await this.resourceService.get(ResourceInfoComponent.resourceId).toPromise();
      this.resource = Resource.fromJSON(res);
      this.resourceForm.controls.name.setValue(this.resource.name);
      this.resourceForm.controls.description.setValue(this.resource.description);
      this.resourceForm.controls.quantity.setValue(this.resource.quantity);
      this.isAvailable = this.resource.available;
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Obtiene y setea las categorías registradas
   */
  private async setCategories() {
    try {
      this.categories = new Array<Category>();
      let res: any = await this.categoryService.list().toPromise();
      res.forEach(cat => { this.categories.push(cat); });
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }
}
