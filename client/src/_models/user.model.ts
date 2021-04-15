export class User {    

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: number,
        public career: string,
        public birth_date: string,
        public student: boolean,
        public semester: number,
        public admin: boolean,
    ) { 
        if (this.student === false) {
            this.semester = null;
        }
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): User {
        if (json === null) { return null; }
        let id = '';
        if (json._id) { id = json._id }
        if (json.id) { id = json.id }
        return new User(
            id,
            json.name,
            json.email,
            json.phone,
            json.career,
            json.birth_date,
            json.student,
            json.semester,
            json.admin
        )
    }
}