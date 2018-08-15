import {ActionSheetController, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ApiProvider} from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-ingredients-list',
    templateUrl: 'manager-ingredients-list.html',
})
export class ManagerIngredientsListPage {
    private ingredients = [];
    filteredItems = [];
    loaded: boolean = false;

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
    }

    /**
     * Loads the ingredients data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('ingredients').loader().get().subscribe(res => {
            this.ingredients = res;
            this.filteredItems = res;
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
     * @param {number} id
     * @param {number} key
     */
    showOptions(id: number, key: number) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Opções',
            buttons: [
                {
                    text: 'Editar',
                    handler: () => this.goToForm(id)
                },
                {
                    text: 'Remover',
                    role: 'destructive',
                    handler: () => {
                        let alert = this.alertCtrl.create({
                            title: 'Confirmar exclusão',
                            message: 'Deseja remover este ingrediente?',
                            buttons: [
                                {
                                    text: 'Não',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Sim',
                                    handler: () => this.remove(id, key)
                                }
                            ]
                        });

                        alert.present();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.ingredients;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes a ingredient
     *
     * @param {number} id
     * @param {number} key
     */
    private remove(id: number, key: number) {
        this.apiProvider.builder('ingredients/' + id).loader().delete().subscribe((res) => {
            this.ingredients.splice(key, 1);
        });
    }
}
