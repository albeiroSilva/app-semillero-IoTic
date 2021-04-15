export class Vision {
    constructor(
        public id: string,
        public vision: string
    ){}
    
    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Vision {
        if (json === null) { return null; }
        return new Vision(
            json.id,
            json.vision
        )
    }
}