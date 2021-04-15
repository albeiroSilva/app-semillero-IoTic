export class Mission {
    constructor(
        public id: string,
        public mission: string
    ){}
    
    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Mission {
        if (json === null) { return null; }
        return new Mission(
            json.id,
            json.mission
        )
    }
}