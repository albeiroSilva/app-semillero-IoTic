import { Component, OnInit } from '@angular/core';
import { faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Resource } from 'src/_models/resource.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceService } from 'src/_services/resource.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { ResourceInfoComponent } from './resource-info/resource-info.component';
import { AuthHelper } from 'src/_helpers/auth.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-resources',
  templateUrl: './admin-resources.component.html',
  styleUrls: ['./admin-resources.component.css']
})
export class AdminResourcesComponent implements OnInit {
  /**
   * Icono de Agregar Recurso
   */
  public faPlus = faPlus;

  /**
   * Icono de Mostrar Recurso
   */
  public faEye = faEye;

  public faTrashAlt = faTrashAlt;

  /**
   * Recursos registrados
   */
  public resources: Array<Resource>;

  /**
   * ¿Está cargando la petición?
   */
  private isLoading: boolean;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private router: Router
    ) { 
    this.setResources();
  }

  ngOnInit() {
    if (!AuthHelper.getLoggedUser()) {
      this.router.navigateByUrl("");
    }
  }

  /**
   * Obtiene y setea los recursos
   */
  private async setResources() {
    try {
      this.isLoading = true;
      this.resources = new Array<Resource>();
      let res:any = await this.resourceService.list().toPromise();

      res.forEach(r => {
        this.resources.push(Resource.fromJSON(r));
      });
      this.isLoading = false;
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Invocada al dar click en Mostrar Recurso
   * @param id Identificador del Recurso
   */
  public showOnClick(id: string) {
    ResourceInfoComponent.resourceId = id;
    this.modalService.open(ResourceInfoComponent);
  }

  /**
   * Invocada al dar click en Agregar Recurso
   */
  public addOnClick() {
    this.modalService.open(ResourceFormComponent);
  }

  /**
   * Invocada al dar click en Eliminar 
   * @param id Identificador del Recurso
   */
  public async deleteOnClick(id: string) {
    try {
      let res = await new MsgHelper().showConfirmDialog('¿Está seguro?', 'El recurso será eliminado de forma permanente');
      if (res.value) {
        res = await this.resourceService.delete(id).toPromise();
        new MsgHelper().showSuccess('El recurso ha sido eliminado exitosamente');
        this.setResources();
      }
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }
}
