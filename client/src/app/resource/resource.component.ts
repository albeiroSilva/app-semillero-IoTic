import { Component, OnInit } from '@angular/core';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { ResourceService } from 'src/_services/resource.service';
import { Resource } from 'src/_models/resource.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  /**
   * Identificador del Recurso
   */
  public static resourceId;

  /**
   * Contiene la información del recurso
   */
  private resource: Resource;

  constructor(
    private resourceService: ResourceService,
    private modal: NgbActiveModal
    ) { 
    this.setResource();
  }

  ngOnInit() {
  }

  /**
   * Obtiene y setea la información del recurso
   */
  private async setResource() {
    try {
      let res = await this.resourceService.get(ResourceComponent.resourceId).toPromise();
      this.resource = Resource.fromJSON(res);
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Cierra el modal
   */
  close() { this.modal.close(); }
}
