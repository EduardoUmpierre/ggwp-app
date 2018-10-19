import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    private index;
    menu = 'ProductsPage';
    schedule = 'SchedulePage';
    bill = 'BillsPage';
    music = 'BillsPage';
    ranking = 'RankingPage';

    constructor(navParams: NavParams) {
        this.index = navParams.get('index')
    }
}
