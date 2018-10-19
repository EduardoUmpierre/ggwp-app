import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-drops-list',
    templateUrl: 'manager-drops-list.html',
})
export class ManagerDropsListPage {
    private drops = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'description'
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the drops data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('drops').loader().get().subscribe(res => {
            this.filteredItems = this.drops = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerDropsFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.drops;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter(item => item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes a drop
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`drops/${id}`).loader().delete().subscribe(() => this.drops.splice(key, 1));
    }

    /**
     * Edits a drop
     *
     * @param {number} id
     */
    edit(id: number) {
        this.goToForm(id);
    }
}
