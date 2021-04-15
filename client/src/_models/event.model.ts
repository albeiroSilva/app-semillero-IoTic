export class Event {
    /**
     * Identificador del evento
     */
    public id: string;

    /**
     * Nombre del evento
     */
    public name: string;

    /**
     * Descripción del evento
     */
    public description: string;

    /**
     * Puntuación
     */
    public score: number;

    /**
     * Fecha del evento
     */
    public date: Date;

    /**
     * Link de la imagen
     */
    public imageLink: string;

    constructor() {}

    public static fromJSON(json: any): Event {
        if (json === null) { return null; }
        var event = new Event();

        event.id = json._id;
        event.name = json.name;
        event.description = json.description;
        event.score = json.score;
        event.date = new Date(json.date);
        event.imageLink = json.image_link;

        return event;
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public getDescPreview(): string {
        return this.description.slice(0, 30);
    }
}