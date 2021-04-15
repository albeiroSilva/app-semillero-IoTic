import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_models/course.model';
import { CourseService } from 'src/_services/course.service';
import { User } from 'src/_models/user.model';
import { AuthHelper } from 'src/_helpers/auth.helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateHelper } from 'src/_helpers/date.helper';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  /**
   * Icono de Cerrar
   */
  faTimes = faTimes;

  /**
   * Identificador del curso.
   */
  public static courseId: string;

  /**
   * Contiene la información del curso.
   */
  public course: Course;

  /**
   * Contiene al usuario de la sesión actual.
   */
  public user: User;

  constructor(
    private courseService: CourseService, 
    private modal: NgbActiveModal,
    private dateHelper: DateHelper) { }

  ngOnInit() {
    this.setCourse();
    this.user = AuthHelper.getLoggedUser();
  }

  /**
   * Cierra el modal
   */
  private close() { this.modal.close(); }

  private async setCourse() {
    let res = await this.courseService.get(CourseComponent.courseId).toPromise();
    this.course = Course.fromJSON(res);
    this.user = AuthHelper.getLoggedUser();
  }
}
