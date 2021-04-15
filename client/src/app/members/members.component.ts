import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user.model';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  /**
   * ¿Hay integrantes?
   */
  public weHaveMembers: boolean;

  /**
   * Integrantes
   */
  public members: Array<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setMembers().then(() => {
      this.weHaveMembers = this.members.length > 0;
    })
  }

  /**
   * Obtiene y setea los miembros
   */
  private async setMembers() {
    let res:any = await this.userService.listAll().toPromise();
    this.members = new Array<User>();

    res.forEach(pending => {
      this.members.push(User.fromJSON(pending));
    });
  }

}
