import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    private menu = 'ProductsPage';
    private schedule = 'SchedulePage';
    private bill = 'BillsPage';
    private music = 'BillsPage';
    private index;

    constructor(navParams: NavParams) {
        this.index = navParams.get('index')
    }
}
