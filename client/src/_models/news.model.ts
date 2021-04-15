export class News {
    /**
     * Identificador de la noticia
     */
    public id: string;

    /**
     * Titulo de la noticia
     */
    public title: string;

    /**
     * Descripción de la noticia
     */
    public description: string;

    /**
     * Desarrollo de la notcia.
     */
    public development: string;

    /**
     * Fecha
     */
    public date: Date;

    /**
     * Imagen de la noticia
     */
    public imageLink: string;

    constructor() { }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): News {
        if (json === null) { return null; }
        var news = new News();

        news.id = json._id;
        news.title = json.title;
        news.description = json.description;
        news.development = json.development;
        news.date = new Date(json.starts_at);
        news.imageLink = json.image_link;

        return news;
    }

    public getDescPreview(): string {
        return this.description.slice(0, 30);
    }
}