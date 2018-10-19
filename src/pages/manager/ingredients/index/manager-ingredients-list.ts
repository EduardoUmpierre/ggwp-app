import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-ingredients-list',
    templateUrl: 'manager-ingredients-list.html',
})
export class ManagerIngredientsListPage {
    private ingredients = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'name',
        subtitle: true,
        subtitleKey: 'allergenic',
        subtitleMap: {
            0: '',
            1: 'Alergênico'
        }
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the ingredients data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('ingredients').loader().get().subscribe(res => {
            this.filteredItems = this.ingredients = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerIngredientsFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.ingredients;

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
        this.apiProvider.builder(`ingredients/${id}`).loader().delete().subscribe(() => this.ingredients.splice(key, 1));
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
