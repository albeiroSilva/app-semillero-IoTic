export class Category {
    /**
     * Identificador de la Categoría
     */
    public id: string;

    /**
     * Nombre de la categoría
     */
    public name: string;

    /**
     * ¿La categoría se encuentra disponible?
     */
    public available: boolean;

    /**
     * Referencia
     */
    public parent: Category;

    constructor() {}

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json: any): Category {
        if (json == null) { return null; }
        let c = new Category();

        c.id = json._id;
        c.name = json.name;
        c.available = json.available;
        c.parent = Category.fromJSON(json.parent);

        return c;
    }
}