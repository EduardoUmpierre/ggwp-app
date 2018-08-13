export class Product {
    private _id: number;
    private _name: string;
    private _price: number;
    private _experience: number;
    private _categories_id: number;
    private _note: string;

    constructor(id?: number, name?: string, price?: number, experience?: number, categories_id?: number, note?: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._experience = experience;
        this._categories_id = categories_id;
        this._note = note;
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

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get experience(): number {
        return this._experience;
    }

    set experience(value: number) {
        this._experience = value;
    }

    get categories_id(): number {
        return this._categories_id;
    }

    set categories_id(value: number) {
        this._categories_id = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }
}
