import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user.model';
import { UserService } from 'src/_services/user.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-admin-members-pending',
  templateUrl: './admin-members-pending.component.html',
  styleUrls: ['./admin-members-pending.component.css']
})
export class AdminMembersPendingComponent implements OnInit {
  /**
   * Icono de Arpobar
   */
  private faCheck = faCheck;

  /**
   * Icono de Rechazar
   */
  private faTimes = faTimes;

  /**
   * ¿Hay solicitudes pendientes?
   */
  private weHavePendings: boolean;

  /**
   * Solicitudes pendientes
   */
  private pendings: Array<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setPendings().then(() => {
      this.weHavePendings = this.pendings.length > 0;
    })
  } 
  
  /**
   * Obtiene y setea las solicitudes pendientes
   */
  private async setPendings() {
    let res:any = await this.userService.listPending().toPromise();
    this.pendings = new Array<User>();

    res.forEach(pending => {
      this.pendings.push(User.fromJSON(pending));
    });
  }

  public async deletePendingOnClick(id: string) {
    try {
      let msg = new MsgHelper();
      let res = await msg.showConfirmDialog('¿Está seguro?', 'La solicitud será eliminada de forma permanente');

      if (res.value) {
        try { 
          await this.userService.deletePending(id).toPromise();
        } catch(err) {
          if(err.status == 200) {
            msg.showSuccess('La solicitud fue eliminada exitosamente');
            this.setPendings();
            return;
          }
          msg.showError('La solicitud no pudo ser eliminada');
        }
      }
    } catch(err) {
      new MsgHelper().showError(err.error);
    }
  }

  public async acceptPendingOnClick(id: string) {
    try {
      let msg = new MsgHelper();
      let res = await msg.showConfirmDialog('¿Realmente desea aceptar esta solicitud?', '');

      if (res.value) {
        try { 
          await this.userService.acceptPending(id).toPromise();
        } catch(err) {
          if(err.status == 200) {
            msg.showSuccess('La solicitud fue aceptada exitosamente');
            this.setPendings();
            return;
          }
          msg.showError('La solicitud no pudo ser aceptada');
        }
      }
    } catch(err) {
      new MsgHelper().showError(err.error);
    }
  }
}
