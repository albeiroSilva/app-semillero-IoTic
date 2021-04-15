import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/_services/course.service';
import { Course } from 'src/_models/course.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { CourseSharedService } from 'src/_services/course.shared.service';
import { FileHelper } from 'src/_helpers/file.helper';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  /**
   * Icono de Fecha Inicio y Fecha Fin
   */
  faCalendarAlt = faCalendarAlt;

  /**
   * Curso a ser registrado
   */
  public course: Course;

  constructor(
    public modalContent: NgbActiveModal, 
    private courseService: CourseService,
    private courseSharedService: CourseSharedService,
    private fileHelper: FileHelper) { 
    this.course = new Course();
  }

  ngOnInit() {
  }

  /**
   * Invocada al dar click en Cancelar
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
   * Invocada al dar click en Agregar
   */
  public async addOnClick() {
    let msg = new MsgHelper();
    try {
      let res:any = await this.courseService.create(this.course).toPromise();
      await this.fileHelper.upload(2, res._id);
      msg.showSuccess('Curso agregado exitosamente');
      this.close();
      this.courseSharedService.add(Course.fromJSON(res));
    } catch(err) {
      if (err.status == 422) { msg.showError(err.error.error); }
    }
  }
}
