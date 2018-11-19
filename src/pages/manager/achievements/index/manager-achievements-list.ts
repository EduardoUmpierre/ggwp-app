import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-achievements-list',
    templateUrl: 'manager-achievements-list.html',
})
export class ManagerAchievementsListPage {
    private achievements = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'name'
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider,
                private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
    }

    /**
     * Loads the achievements data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('achievements').loader().get().subscribe(res => {
            this.filteredItems = this.achievements = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerAchievementsFormPage', {id: id});
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
                            message: 'Deseja remover esta conquista?',
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
        this.filteredItems = this.achievements;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.name.indexOf(val) > -1);
        }
    }

    /**
     * Removes an item
     *
     * @param {number} id
     * @param {number} key
     */
    private remove(id: number, key: number) {
        this.apiProvider.builder(`achievements/${id}`).loader().delete().subscribe(() => this.achievements.splice(key, 1));
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
