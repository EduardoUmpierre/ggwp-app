import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-detail',
    templateUrl: 'manager-bills-detail.html',
})
export class ManagerBillsDetailPage {
    private id;
    total: number = 0.00;
    title: string;
    loaded: boolean = false;
    bill;

    constructor(private navCtrl: NavController, private navParams: NavParams, private apiProvider: ApiProvider,
                private alertCtrl: AlertController) {
        this.id = this.navParams.get('id');
    }

    /**
     * Loads the bill data
     */
    ionViewWillEnter() {
        if (this.id) {
            this.apiProvider.builder(`bills/${this.id}`).loader().get().subscribe(res => {
                this.bill = res;
                this.title = `Comanda #${res.card.number}`;
                this.total = parseFloat(res.total);
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

    /**
     * @param {number} id
     */
    doCheckout(id: number) {
        const confirm = this.alertCtrl.create({
            title: 'Confirmação',
            message: 'Deseja fechar esta comanda?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.apiProvider.builder('bills/checkout').loader().post({id: id}).subscribe(() => this.navCtrl.pop());
                    }
                }
            ]
        });

        confirm.present();
    }

    /**
     *
     * @param {number} id
     */
    delete(id: number) {
        const confirm = this.alertCtrl.create({
            title: 'Excluir comanda',
            message: `Você confirma a exclusão da comanda #${this.bill.card.number}?`,
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.apiProvider.builder(`bills/${id}`).loader().delete().subscribe(() => this.navCtrl.pop());
                    }
                }
            ]
        });

        confirm.present();
    }

    /**
     * Removes a product
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`bills/${this.id}/products/${id}`).loader().delete().subscribe((res) => {
            this.bill.products.splice(key, 1);
            this.total = parseFloat(res.total);
        });
    }
}
