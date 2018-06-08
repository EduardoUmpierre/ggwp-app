import { Component } from '@angular/core';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    menu = 'ProductsPage';
    schedule = 'BillsPage';
    bill = 'BillsPage';
    music = 'BillsPage';

    constructor() {

    }
}
