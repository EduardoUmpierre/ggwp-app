import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-drops-list',
    templateUrl: 'manager-drops-list.html',
})
export class ManagerDropsListPage {
    private drops = [];
    filteredItems = [];
    loaded: boolean = false;

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider,
                private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
    }

    /**
     * Loads the drops data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('drops').loader().get().subscribe(res => {
            this.drops = res;
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
        this.navCtrl.push('ManagerDropsFormPage', {id: id});
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
                            message: 'Deseja remover esta recompensa?',
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
        this.filteredItems = this.drops;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes a drop
     *
     * @param {number} id
     * @param {number} key
     */
    private remove(id: number, key: number) {
        this.apiProvider.builder('drops/' + id).loader().delete().subscribe((res) => {
            this.drops.splice(key, 1);
        });
    }
}
