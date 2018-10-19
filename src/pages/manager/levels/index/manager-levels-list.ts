import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-levels-list',
    templateUrl: 'manager-levels-list.html',
})
export class ManagerLevelsListPage {
    private levels = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'number',
        titleDecoration: 'Nível ',
        subtitle: true,
        subtitleKey: 'experience',
        subtitleDecoration: 'XP '
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the levels data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('levels').loader().get().subscribe(res => {
            this.filteredItems = this.levels = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerLevelsFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.levels;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter(item => item.number.toString().indexOf(val.toString()) > -1);
        }
    }

    /**
     * Removes a level
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`levels/${id}`).loader().delete().subscribe(() => this.levels.splice(key, 1));
    }

    /**
     * Edits a level
     *
     * @param {number} id
     */
    edit(id: number) {
        this.goToForm(id);
    }
}
