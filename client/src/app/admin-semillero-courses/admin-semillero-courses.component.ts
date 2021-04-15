import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_models/course.model';
import { CourseService } from 'src/_services/course.service';
import { faPlus, faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseFormComponent } from './course-form/course-form.component';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { CourseInfoComponent } from './course-info/course-info.component';
import { CourseSharedService } from 'src/_services/course.shared.service';

@Component({
  selector: 'app-admin-semillero-courses',
  templateUrl: './admin-semillero-courses.component.html',
  styleUrls: ['./admin-semillero-courses.component.css']
})
export class AdminSemilleroCoursesComponent implements OnInit {
  /**
   * Icono de Añadir Curso
   */
  faPlus = faPlus;

  /**
   * Icono de Ver Curso
   */
  faEye = faEye;


  /**
   * Icono de Editar Curso
   */
  faPen = faPen;

  /**
   * Icono de Eliminar Curso
   */
  faTrashAlt = faTrashAlt;

  /**
   * Contiene todos los cursos
   */
  public courses: Array<Course>;

  /**
   * ¿Hay cursos registrados?
   */
  public weHaveCourses: boolean;

  /**
   * ¿Está cargando la petición?
   */
  public isLoading: boolean;

  constructor(
    private courseService: CourseService, 
    private modalService: NgbModal,
    private courseSharedService: CourseSharedService) { }

  ngOnInit() {
    this.setCourses().then(() => {
      this.courseSharedService.courses = this.courses;
      this.weHaveCourses = this.courseSharedService.courses.length > 0;
    });
    this.courseSharedService.refCourses().subscribe(courses => this.courses = courses);
  }

  /**
   * Obtiene y setea los cursos registrados
   */
  public async setCourses() {
    this.isLoading = true;
    try {
      let res:any = await this.courseService.list().toPromise();
      this.courses = new Array<Course>();
  
      res.forEach(course => {
        this.courses.push(Course.fromJSON(course))
      });
    } catch(err) {
      new MsgHelper().showError(err.message);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Invoca al dar click en Agregar
   */
  public async addOnClick() {
    this.modalService.open(CourseFormComponent);
  }

  /**
   * Invocada al dar click en Mostrar
   * @param course Curso a mostrar
   */
  public showOnClick(id: string) {
    CourseInfoComponent.id = id;
    this.modalService.open(CourseInfoComponent);
  }

  /**
   * Invocada al dar click en Eliminar
   * @param id Identificador del curso
   */
  public async deleteOnClick(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('¿Está seguro?', 'El curso será eliminado de forma permanente');
    
    if (res.value) {
      try {
        await this.courseService.delete(id).toPromise();
      } catch(err) {
        if (err.status == 200) {
          msg.showSuccess('El curso fue eliminado exitosamente');
          this.setCourses();
          return;
        }
        msg.showError('El curso no pudo ser eliminado');
      }
    }
  }
}
