export class Course {
    /**
     * Identificador del curso
     */
    public id: string;

    /**
     * Nombre del curso
     */
    public name: string;

    /**
     * Descripción
     */
    public description: string;

    /**
     * Profesor que imparte el curso
     */
    public teacher: string;

    /**
     * Fecha de inicio
     */
    public starts_at: Date;

    /**
     * Fecha fin
     */
    public ends_at: Date;

    /**
     * Link de la imagen del curso
     */
    public imageLink: string;

    /**
     * Link de moodle
     */
    public moodleLink: string;

    constructor() { }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Course {
        if (json === null) { return null; }
        var course = new Course();

        course.id = json._id;
        course.name = json.name;
        course.description = json.description;
        course.teacher = json.teacher;
        course.starts_at = new Date(json.starts_at);
        course.ends_at = new Date(json.ends_at);
        course.imageLink = json.image_link;
        course.moodleLink = json.moodle_link;

        return course;
    }

    public getDescPreview(): string {
        return this.description.slice(0, 30);
    }
}