import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/_models/course.model';
import { CourseService } from 'src/_services/course.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { faCalendarAlt, faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { CourseSharedService } from 'src/_services/course.shared.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  /**
   * Icono de Fecha Inicio y Fecha Fin
   */
  public faCalendarAlt = faCalendarAlt;

  /**
   * Icono de Cancelar
   */
  public faTimes = faTimes;

  /**
   * Icono de Actualizar
   */
  public faCheck = faCheck;

  /**
   * Icono de Editar
   */
  public faPen = faPen;

  /**
   * Contiene la información del curso
   */
  public course: Course;

  /**
   * ¿Se puede editar el formulario?
   */
  public isEditable: boolean;

  /**
   * Identificador del curso
   */
  public static id: string;

  constructor(
    private modalContent: NgbActiveModal, 
    private courseService: CourseService,
    private courseSharedService: CourseSharedService) { }

  ngOnInit() {
    this.setCourse();
  }

  /**
   * Cierra el modal
   */
  public close() {
    this.modalContent.close();
  }

  /**
   * Setea la información del curso
   */
  private async setCourse() {
    try {
      let res = await this.courseService.get(CourseInfoComponent.id).toPromise();
      this.course = Course.fromJSON(res);
    } catch (err) {
      this.close();
    }
  }

  /**
   * Invacada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.isEditable = false;
    this.setCourse();
  }

  /**
   * Invocada al dar click en Actualizar
   */
  public async updateOnClick() {
    try {
      let res = await this.courseService.update(this.course.id, this.course).toPromise();
      this.courseSharedService.update(Course.fromJSON(res));
      new MsgHelper().showSuccess("Curso actualizado exitosamente");
    } catch (err) {
      if (err.status == 422) {
        new MsgHelper().showError(err.error.error);
        this.setCourse();
      }
    } finally {
      this.isEditable = false;
    }
  }
}
