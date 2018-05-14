import { Component } from '@angular/core';

import { ProductsPage } from '../products/index/products';
import { BillsPage } from "../bills/bills";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    menu = ProductsPage;
    schedule = BillsPage;
    bill = BillsPage;
    music = BillsPage;

    constructor() {

    }
}
