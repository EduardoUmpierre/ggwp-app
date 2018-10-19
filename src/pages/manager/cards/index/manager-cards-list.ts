import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-cards-list',
    templateUrl: 'manager-cards-list.html',
})
export class ManagerCardsListPage {
    private cards = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'number',
        titleDecoration: '#'
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the cards data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('cards').loader().get().subscribe(res => {
            this.filteredItems = this.cards = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerCardsFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.cards;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter(item => item.number.toString().indexOf(val.toString()) > -1);
        }
    }

    /**
     * Removes an item
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`cards/${id}`).loader().delete().subscribe(() => this.cards.splice(key, 1));
    }

    /**
     * Edits and item
     *
     * @param {number} id
     */
    edit(id: number) {
        this.goToForm(id);
    }
}
