import { Component } from '@angular/core';
import { BillsPage } from "../../default/bills/bills";
import { MenuPage } from "../menu/menu";

@Component({
    templateUrl: 'tabs.html'
})
export class ManagerTabsPage {
    menu = MenuPage;
    schedule = BillsPage;
    bill = BillsPage;
    music = BillsPage;

    constructor() {

    }
}
