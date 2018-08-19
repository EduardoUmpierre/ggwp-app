import { Component, Input } from '@angular/core';
import { Ingredient } from "../../../models/Ingredient";

@Component({
    selector: 'product-ingredients-list',
    templateUrl: 'product-ingredients-list.html'
})
export class ProductIngredientsListComponent {
    @Input('customClass') class: string = '';
    @Input('ingredients') ingredients: Ingredient[] = [];

    constructor() {
    }
}
