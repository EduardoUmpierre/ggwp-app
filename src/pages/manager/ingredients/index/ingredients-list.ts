import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-ingredients-list',
    templateUrl: 'ingredients-list.html',
})
export class IngredientsListPage {
    private ingredients = [];
    private loaded: boolean = false;

    constructor(public navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     *
     */
    ionViewWillEnter() {
        this.apiProvider.builder('ingredients').loader().get().subscribe(res => {
            this.ingredients = res;
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
}
