import { Component, OnInit } from '@angular/core';
import { faEye, faHourglassEnd, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanInfoComponent } from '../admin-loans-finished/loan-info/loan-info.component';
import { DateHelper } from 'src/_helpers/date.helper';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-admin-loans-in-progress',
  templateUrl: './admin-loans-in-progress.component.html',
  styleUrls: ['./admin-loans-in-progress.component.css']
})
export class AdminLoansInProgressComponent implements OnInit {

  /**
  * Icono de ver información
  */
  public faEye = faEye;
  /**
  * Icono de Notificar
  */
  public faExclamation = faExclamation;
  /**
  * Icono de Finalizar
  */
  public faTimes = faHourglassEnd;
  /**
  * Prestamos registrados
  */
  public loans: Array<Loan>;
  /**
  * ¿Está cargando la petición?
  */
  public weHaveLoan: boolean;

  constructor(private loanService: LoanService,
    private modalService: NgbModal,
    private dateHelper : DateHelper,
    private serviceLoan : LoanService
    ) {
    
      this.loans = new Array<Loan>();
     }
  ngOnInit() {
    this.getLoan();
  }
  /**
  * Cargar los prestamos
  */
  private async getLoan() { 
    try {
      
      let res: any = await this.loanService.list().toPromise();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 1){
          this.loans.push(Loan.fromJSON(e));
        } 
      }); 
      
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
    this.weHaveLoan = this.loans.length > 0;   
  }
  /**
   * Mostrar info
   */
  public showOnClick(l : Loan) {
    LoanInfoComponent.loan = l;
    this.modalService.open(LoanInfoComponent);
  }
/**
  * Invocada al dar click en Finalizar
  * @param id Identificador del prestamo
  */
 public async finishedLoan(auxLoan : Loan) {
  auxLoan.state = 2;
  let msg = new MsgHelper();
  let res = await msg.showConfirmDialog('¿Está seguro?','El prestamo pasará a Prestamos Finalizados');
  if(res.value){
    try {
    
      await this.serviceLoan.updateState(auxLoan.loanId,auxLoan).toPromise();

      new MsgHelper().showSuccess("Prestamo finalizado exitosamente");
      location.reload();
    } catch (err) {
      if (err.status == 422) {
        new MsgHelper().showError(err.error.error);
      } else {
        new MsgHelper().showError(err.message);
      }

      }
    }

  }

  public async sendMessage(){
    let msg = new MsgHelper();
    let res = await msg.showConfirmMessage('¿Desea enviar correo de solicitud de recursos?','');

    if(res.value){

    }
  }

}
