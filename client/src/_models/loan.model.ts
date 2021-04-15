import { User } from './user.model';

export class Loan {
    /**
     * Identificador del prestamo
     */
    public loanId: string; 
    /**
     * Fecha Inicio
     */
    public dateStart: Date;
    /**
     * Fecha fin
     */
    public dateEnd: Date;   
    /**
     * Fecha de aprobación
     */
    public dateApproved: Date;
    /**
     * Link imagen de los recursos
     */
    public image_resource_link: string;
    /**
     * Link imagen del formato
     */
    public image_format_link: string;
    /**
     * Estado del prestamo 0:Solicitado 1:En curso 2:Finalizados
     */
    public state: number;
    /**
     * Información del usuario
     */
    public user : User;

    constructor() {
        this.user = new User('','','',0,'','',false,0,false);
    }

    public getdateStart(): string {
        var dateStart = '';

        let year = this.dateStart.getFullYear().toString();
        let month = this.dateStart.getMonth().toString();
        let day = this.dateStart.getDate().toString();
        dateStart = `${day}/${month}/${year}`;

        return dateStart;
    }

    public static fromJSON(json: any): Loan {
        if (json === null) { return null; }
        var loan = new Loan();

        loan.loanId = json._id;
        loan.dateStart = new Date(json.dateStart);
        loan.dateApproved = new Date(json.dateApproved);
        loan.dateEnd = new Date(json.dateEnd);
        loan.image_resource_link = json.image_resource_link;
        loan.image_format_link = json.image_format_link;
        loan.user = json.userId;
        loan.state = json.state;

        return loan;  
    }



    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}