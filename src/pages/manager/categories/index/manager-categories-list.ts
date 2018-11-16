import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-categories-list',
    templateUrl: 'manager-categories-list.html',
})
export class ManagerCategoriesListPage {
    private categories = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'name'
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the categories data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('categories').loader().get().subscribe(res => {
            this.filteredItems = this.categories = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerCategoriesFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.categories;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter(item => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes an ingredient
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`categories/${id}`).loader().delete().subscribe(() => this.categories.splice(key, 1));
    }

    /**
     * Edits and ingredient
     *
     * @param {number} id
     */
    edit(id: number) {
        this.goToForm(id);
    }
}
