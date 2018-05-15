import { Component } from '@angular/core';
import { ProductsPage } from "../../default/products/index/products";
import { BillsPage } from "../../default/bills/bills";

@Component({
    templateUrl: 'tabs.html'
})
export class ManagerTabsPage {
    menu = ProductsPage;
    schedule = BillsPage;
    bill = BillsPage;
    music = BillsPage;

    constructor() {

    }
}
