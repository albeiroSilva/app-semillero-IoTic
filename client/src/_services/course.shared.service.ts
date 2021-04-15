import { Injectable, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/_models/course.model';

@Injectable()
export class CourseSharedService {
    /**
     * Permite referenciar a los cursos
     */
    @Output() coursesEmitter: EventEmitter<any> = new EventEmitter();

    /**
     * Cursos registrados
     */
    private _courses: Array<Course>;

    constructor() { }
 
    set courses(value: Array<Course>) { this._courses = value; }
    get courses() { return this._courses; }

    /**
     * Agrega un curso
     * @param course Curso a agregar
     */
    public add(course: Course) {
        this._courses.push(course);
    }

    /**
     * Actualiza un curso
     * @param course Contiene la información actualizada
     */
    public update(course: Course) {
        for (var i = 0; i < this._courses.length; i++) {
            if (this._courses[i].id == course.id) {
                this._courses[i] = course;
                break;
            }
        }
        this.coursesEmitter.emit(this._courses);
    }

    /**
     * Retorna la referencia a los cursos
     */
    public refCourses() {
        return this.coursesEmitter;
    }
}