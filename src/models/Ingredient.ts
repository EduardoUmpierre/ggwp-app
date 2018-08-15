export class Ingredient {
    private _id: number;
    private _name: string;
    private _allergenic: boolean;

    constructor(id?: number, name?: string, allergenic?: boolean) {
        this._id = id;
        this._name = name;
        this._allergenic = allergenic;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get allergenic(): boolean {
        return this._allergenic;
    }

    set allergenic(value: boolean) {
        this._allergenic = value;
    }
}
