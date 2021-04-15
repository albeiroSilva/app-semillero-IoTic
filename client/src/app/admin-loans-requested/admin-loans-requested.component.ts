import { Component, OnInit } from '@angular/core';

import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import {  faEye  } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoansFormComponent } from './loans-form/loans-form.component';
import { DateHelper } from 'src/_helpers/date.helper';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-admin-loans-requested',
  templateUrl: './admin-loans-requested.component.html',
  styleUrls: ['./admin-loans-requested.component.css']
})
export class AdminLoansRequestedComponent implements OnInit {
  /**
  * Icono de vista
  */
  public faEye = faEye;
  /**
  * Prestamos registrados
  */
  private loans: Array<Loan>;
  /**
   * Hay prestamos?
   */
  public weHaveLoan: boolean;

  constructor(private loanService: LoanService,
    private modalService: NgbModal,
    private dateHelper : DateHelper,
    ) { 

    }

  ngOnInit() {
    this.getLoan();
  }
  /**
   * Cargar los prestamos
   */
  private async getLoan() { 
    try {
      this.weHaveLoan = true;
      let res: any = await this.loanService.list().toPromise();
      this.loans = new Array<Loan>();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 0){
          this.loans.push(Loan.fromJSON(e));
        }
      });
    } catch (err) {
      new MsgHelper().showError(err.error);
      this.weHaveLoan = false;
    }
    this.weHaveLoan = this.loans.length > 0;
  }
  /**
   * Mostrar info
   */
  public showOnClick(l : Loan) {
    LoansFormComponent.loan = l;
    this.modalService.open(LoansFormComponent);
  }
}
