import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
                private alertCtrl: AlertController) {
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
     * @param {number} id
     */
    goToOrderForm(id: number) {
        this.navCtrl.push('ManagerBillsOrderFormPage', {id: id});
    }

    doCheckout(id: number) {
        this.apiProvider.builder('bills/checkout').loader().post({id: id}).subscribe(res => {
            this.navCtrl.pop();
        });
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
}
