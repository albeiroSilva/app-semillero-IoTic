export class Message {
    /**
     * Identificador del Mensaje
     */
    public id: string;

    /**
     * Nombre del Remitente
     */
    public sender: string;

    /**
     * Correo del Remitente
     */
    public email: string;

    /**
     * Número telefónico del Remitente
     */
    public phoneNumber: string;

    /**
     * Contenido del Mensaje
     */
    public message: string;

    /**
     * Fecha en que fue enviado
     */
    public sentAt: Date;

    /**
     * ¿El mensaje se encuentra visible?
     */
    public isVisible: boolean;

    constructor() { 
        this.isVisible = false;
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Message{
        if (json === null) { return null; }
        let msg = new Message();

        msg.id = json._id;
        msg.sender = json.sender;
        msg.email = json.email;
        msg.phoneNumber = json.phone_number;
        msg.message = json.message;
        msg.sentAt = new Date(json.sent_at);

        return msg;
    }
}