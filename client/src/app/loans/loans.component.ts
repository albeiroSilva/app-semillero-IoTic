import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/_services/loan.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { Loan } from 'src/_models/loan.model';
import { AuthHelper } from 'src/_helpers/auth.helper';
import { LoanInfoComponent } from '../admin-loans-finished/loan-info/loan-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  /**
   * Icono de Agregar Prestamo
   */
  private faPlus = faPlus;

  /**
   * Prestamos en Espera
   */
  private requestedLoans: Array<Loan>;

  /**
   * Prestamos en Curso
   */
  private loansInProgress: Array<Loan>;

  /**
   * Prestamos Finalizados
   */
  private loansFinished: Array<Loan>;

  constructor(
    private loanService: LoanService,
    private modalService: NgbModal,
    private router: Router
  ) { 
    this.setLoans();
  }

  ngOnInit() {
    if (!AuthHelper.getLoggedUser()) {
      this.router.navigateByUrl("");
    }
  }

  /**
   * Obtiene y setea la información de los prestamos del usuario
   */
  private async setLoans() {
    try {
      let userId = AuthHelper.getLoggedUser().id;
      let loans:any = await this.loanService.getByUser(userId).toPromise();
      this.requestedLoans = new Array<Loan>();
      this.loansInProgress = new Array<Loan>();
      this.loansFinished = new Array<Loan>();
      loans.forEach(l => {
        if (l.state == 0) {
          this.requestedLoans.push(Loan.fromJSON(l));
        }
        if (l.state == 1) {
          this.loansInProgress.push(Loan.fromJSON(l));
        }
        if (l.state == 2) {
          this.loansFinished.push(Loan.fromJSON(l));
        }
      });
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Invocada al dar click en Agregar Prestamo
   */
  private addOnClick() {
    this.modalService.open(LoanFormComponent)
  }

  /**
   * Invocada al dar click en un prestamo
   * @param loan prestamo a mostrar
   */
  private loanOnClick(loan: Loan) {
    LoanInfoComponent.loan = loan;
    this.modalService.open(LoanInfoComponent);
  }
}
