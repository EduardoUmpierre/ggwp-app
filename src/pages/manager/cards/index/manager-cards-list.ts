import {Component} from '@angular/core';
import {IonicPage, NavController, ActionSheetController, AlertController} from 'ionic-angular';
import {ApiProvider} from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-cards-list',
    templateUrl: 'manager-cards-list.html',
})
export class ManagerCardsListPage {
    private cards = [];
    filteredItems = [];
    loaded: boolean = false;

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
    }

    /**
     * Loads the cards data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('cards').loader().get().subscribe(res => {
            this.cards = res;
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
        this.navCtrl.push('ManagerCardsFormPage', {id: id});
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
                            message: 'Deseja remover este card?',
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
        this.filteredItems = this.cards;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.number.toString().indexOf(val.toString()) > -1);
        }
    }

    /**
     * Removes an item
     *
     * @param {number} id
     * @param {number} key
     */
    private remove(id: number, key: number) {
        this.apiProvider.builder('cards/' + id).loader().delete().subscribe((res) => {
            this.cards.splice(key, 1);
        });
    }
}
