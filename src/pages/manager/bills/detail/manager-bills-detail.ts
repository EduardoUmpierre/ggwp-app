import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-detail',
    templateUrl: 'manager-bills-detail.html',
})
export class ManagerBillsDetailPage {
    private title = 'Comanda #';
    private bill;
    private id;

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider,
                public alertCtrl: AlertController) {
        this.id = this.navParams.get('id');
    }

    /**
     * Loads the bill data
     */
    ionViewWillEnter() {
        if (this.id) {
            this.apiProvider.builder('bills/' + this.id).loader().get().subscribe(res => {
                this.bill = res;
                this.title = this.title + res.card.number;
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
