import { Category } from './category.model';

export class Resource {
    /**
     * Identificador del Recurso
     */
    public id: string;

    /**
     * Nombre del Recurso
     */
    public name: string;

    /**
     * Descripción del Recurso
     */
    public description: string;

    /**
     * Link de la imagen del Recurso
     */
    public imageLink: string;

    /**
     * ¿Se encuentra disponible?
     */
    public available: boolean;

    /**
     * Cantidad de unidades
     */
    public quantity: number;

    /**
     * Categoría a la que pertenece
     */
    public category: Category;

    constructor() {}

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json: any): Resource {
        let r = new Resource();

        r.id = json._id;
        r.name  = json.name;
        r.description = json.description;
        r.imageLink = json.image_link;
        r.available = json.available;
        r.quantity = json.quantity;
        r.category = json.category == null ? null : Category.fromJSON(json.category);

        return r;
    }

    public getDescPreview() {
        return this.description.slice(0, 30);
    }

}