import { Component } from '@angular/core';
import {
    ActionSheetController, AlertController, IonicPage, ModalController, NavController,
    NavParams
} from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-detail',
    templateUrl: 'manager-bills-detail.html',
})
export class ManagerBillsDetailPage {
    private title;
    private bill;
    private id;
    private loaded;

    constructor(private navCtrl: NavController, private navParams: NavParams, private apiProvider: ApiProvider,
                private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController,
                private modalCtrl: ModalController) {
        this.id = this.navParams.get('id');
    }

    /**
     * Loads the bill data
     */
    ionViewWillEnter() {
        this.title = 'Comanda #';

        if (this.id) {
            this.apiProvider.builder('bills/' + this.id).loader().get().subscribe(res => {
                this.bill = res;
                this.title = this.title + res.card.number;
                this.loaded = true;
            });
        } else {
            this.navCtrl.setRoot('ManagerBillsListPage');
        }
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerBillsFormPage', {id: id});
    }

    /**
     *
     * @param {number} id
     */
    delete(id: number) {
        const confirm = this.alertCtrl.create({
            title: 'Excluir comanda',
            message: 'Você confirma a exclusão da comanda #' + this.bill.card.number + '?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.apiProvider.builder('bills/' + this.id).loader().delete().subscribe(res => {
                            this.navCtrl.push('ManagerBillsListPage').then(() => {
                                this.navCtrl.remove(this.navCtrl.getActive().index - 2, 2);
                            });
                        });
                    }
                }
            ]
        });

        confirm.present();
    }

    /**
     *
     * @param {number} id
     * @param {number} key
     */
    showOptions(id: number, key: number) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Opções',
            buttons: [
                {
                    text: 'Editar',
                    handler: () => {
                        // let productModal = this.modalCtrl.create(OrderProductModalPage, {product: this.order[key]});
                        //
                        // productModal.onDidDismiss(data => {
                        //     if (data instanceof Product) {
                        //         this.order[key] = data;
                        //         this.updateTotal();
                        //     }
                        // });
                        //
                        // productModal.present();
                    }
                },
                {
                    text: 'Remover',
                    role: 'destructive',
                    handler: () => {
                        let alert = this.alertCtrl.create({
                            title: 'Confirmar exclusão',
                            message: 'Deseja remover esse produto da comanda?',
                            buttons: [
                                {
                                    text: 'Não',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Sim',
                                    handler: () => {
                                        this.removeProduct(id);
                                    }
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

    //
    removeProduct(id: number) {

    }
}
