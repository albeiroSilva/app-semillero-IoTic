import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, } from '@fortawesome/free-solid-svg-icons';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import { Loan } from 'src/_models/loan.model';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';
import { DateHelper } from 'src/_helpers/date.helper';
import { FileHelper } from 'src/_helpers/file.helper';

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent implements OnInit {

  /**
  * Icono de Calendario
  */
  public faCalendarAlt = faCalendarAlt;
  /**
  * Información del prestamo
  */
  public static loan : Loan;
  public auxLoan : Loan; 
  /**
  * Información del prestamo
  */
  public resources : Array<ResourceLoaned>;

  private LoansForm: FormGroup;
  /**
   * Información para aprobar el prestamo
   */
  dateEnd = new FormControl('', [Validators.required]);
  imgResource = new FormControl('',[Validators.required]);
  imgFormat = new FormControl();

  constructor(public modalContent: NgbActiveModal,
    private serviceLoan : LoanService,
    private serviceResourcesLoaned : ResourceLoanedService,
    private dateHelper : DateHelper,
    private fileHelper: FileHelper
    ) {
      this.resources = new Array<ResourceLoaned>();
      this.auxLoan = new Loan();
   }

  ngOnInit() {
    this.setResourceLoaned();
  }

  get f() { return this.LoansForm.controls; }

  /**
  * Obtiene los id de los recursos pertenecientes al prestamo
  */
  private async setResourceLoaned(){
    this.auxLoan = LoansFormComponent.loan;
    let res: any = await this.serviceResourcesLoaned.get_by_loanId(this.auxLoan.loanId).toPromise();
    res.forEach((e: Object) => {
      this.resources.push(ResourceLoaned.fromJSON(e));
    });  

  }
  /**
  * Llamado al metodo cerrar formulario
  */
  public cancelOnClick() {
    this.close();
  }
  /**
  * Cierra el formulario
  */
  private close() {
    this.modalContent.close();
  }
  /**
   * Invocada al dar click en Aprobar
   * @param id Identificador del curso
   */
  public async onSubmit() {
    if (this.fileHelper.file == null) { 
      new MsgHelper().showError('No ha seleccionado la imagen de los recursos entregados');
      return;
    }

    this.auxLoan.dateEnd = this.dateEnd.value;
    this.auxLoan.image_resource_link = this.imgResource.value;
    this.auxLoan.image_format_link = this.imgFormat.value;
    this.auxLoan.state = 1;

    try {
      let res:any = await this.serviceLoan.update(this.auxLoan.loanId, this.auxLoan).toPromise();
      await this.fileHelper.upload(5, res._id);
      if (this.fileHelper.file2 != null) {
        await this.fileHelper.upload2(6, res._id);
      }
      new MsgHelper().showSuccess("Prestamo aprobado exitosamente");
      location.reload();
      this.close();
    } catch (err) {
      if (err.status == 422) {
        new MsgHelper().showError(err.error.error);
      } else {
        new MsgHelper().showError(err.message);
      }
    }
  }
  /**
   * Invocada al dar click en Eliminar
   * @param id Identificador del prestamo
   */
  public async deleteOnClick(id : string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('¿Está seguro que desea eliminar la solicitud?', 'La solicitud será eliminada de forma permanente');

    if (res.value) {
      try {
        await this.serviceLoan.delete(id).toPromise();
        await this.serviceResourcesLoaned.delete(id).toPromise();
        
      } catch(err) {
        if (err.status == 200) {         
          msg.showSuccess('El prestamo fue eliminado exitosamente');
          location.reload();
          this.close();
          return;
        }
        msg.showError('El prestamo no pudo ser eliminado');
      }
    }
    
  }
  
}

