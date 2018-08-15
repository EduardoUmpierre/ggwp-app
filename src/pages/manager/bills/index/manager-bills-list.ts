import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-list',
    templateUrl: 'manager-bills-list.html',
})
export class ManagerBillsListPage {
    private bills = [];
    private filteredItems = [];
    private loaded: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the bills data
     */
    ionViewWillEnter() {
        this.apiProvider.builder('bills').loader().get().subscribe(res => {
            this.bills = res;
            this.filteredItems = res;
            this.loaded = true;
        });
    }
    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.bills;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.number.toString().indexOf(val) > -1);
        }
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerBillsFormPage', {id: id});
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToDetails(id: number) {
        this.navCtrl.push('ManagerBillsDetailPage', {id: id});
    }
}
