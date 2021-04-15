import { Resource } from './resource.model';
import { Loan } from './loan.model';

export class ResourceLoaned{
    /**
     * Id del prestamo
     */
    public loan: Loan;
    /**
     * Id del usuario
     */
    public resource: Resource;
    /**
     * Cantidad de Recursos
     */
    public quantity: Number;

    constructor() {
        this.loan = new Loan();
        this.resource = new Resource();
    }

    public static fromJSON(json: any): ResourceLoaned {
        let r = new ResourceLoaned();

        r.loan  = json.loanId;
        r.resource = json.resourceId;
        r.quantity = json.quantity;


        return r;
    }
    
}