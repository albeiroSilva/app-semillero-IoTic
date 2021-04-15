import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from 'src/_services/resource.service';
import { Resource } from 'src/_models/resource.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';
import { LoanService } from 'src/_services/loan.service';
import { AuthHelper } from 'src/_helpers/auth.helper';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  /**
   * Icono de Agregar Recurso
   */
  private faArrowDown = faArrowDown;

  /**
   * Icono de Agregar Recurso
   */
  private faPaperPlane = faPaperPlane;

  /**
   * Recursos disponibles
   */
  public resources: Array<Resource>;

  /**
   * Formulario de Prestamo
   */
  private loanForm: FormGroup;

  /**
   * ¿Se ha dado click en Agregar Recurso?
   */
  private submitted: boolean;

  /**
   * Recursos a ser solicitados
   */
  private selectedResources: Array<ResourceLoaned>;

  constructor(
    private modal: NgbActiveModal,
    private resourceService: ResourceService,
    private formBuilder: FormBuilder,
    private loanService: LoanService
  ) { 
    this.selectedResources = new Array<ResourceLoaned>();
    this.setResources();
    this.loanForm = formBuilder.group({
      resource: [null, Validators.required],
      quantity: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  get f () { return this.loanForm.controls; }

  /**
   * Obtiene y setea los recursos disponible
   */
  private async setResources() {
    try {
      this.resources = new Array<Resource>();
      let res:any = await this.resourceService.list().toPromise();
      res.forEach((r: any) => { 
        if (r.available) {
          this.resources.push(Resource.fromJSON(r));
        }
      });
    } catch (err) {
      new MsgHelper().showError(err.console.error());
    }
  }

  /**
   * Cierra el modal
   */
  private close() {
    this.modal.close();
  }

  /**
   * Invocada al dar click en Agregar Prestamo
   */
  private onSubmit(resource: Resource) {
    this.submitted = true;
    if (this.loanForm.invalid) { return; }

    let r = new ResourceLoaned();
    r.loan = null;
    r.resource = this.f.resource.value;
    r.quantity = this.f.quantity.value;
    this.selectedResources.push(r);
  }

  /**
   * Envía la solicitud de prestamo
   */
  private async send() {
    if (this.selectedResources.length == 0) { 
      new MsgHelper().showError('No ha selecciado ningún recurso');
      return; 
    }
    try {
      let userId = AuthHelper.getLoggedUser().id;
      let res = await this.loanService.create(userId, this.selectedResources).toPromise();
      new MsgHelper().showSuccess('Solicitud enviada correctamente');
      this.close();
      location.reload();
    } catch (err) {
        new MsgHelper().showError(err.error);
    }
    this.selectedResources = new Array<ResourceLoaned>();
  }
}
