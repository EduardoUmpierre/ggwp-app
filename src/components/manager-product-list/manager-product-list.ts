import { Component, Input } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from "ionic-angular";

@Component({
    selector: 'manager-product-list',
    templateUrl: 'manager-product-list.html'
})
export class ManagerProductListComponent {
    @Input('products') products: any;
    @Input('layout') layout: string;

    private layoutClass: string = '';

    constructor(private navCtrl: NavController, private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController) {
        if (this.layout == 'small') {
            this.layoutClass = 'list__content-small';
        }
    }

    /**
     * @param {number} id
     * @param {number} key
     */
    click(id: number, key?: number) {
        if (this.layout) {
            this.showOptions(id, key);
        } else {
            this.goToForm(id);
        }
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    private goToForm(id: number = null) {
        this.navCtrl.push('ManagerProductsFormPage', {id: id});
    }

    /**
     *
     * @param {number} id
     * @param {number} key
     */
    private showOptions(id: number, key: number) {
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

    /**
     * @param {number} id
     */
    private removeProduct(id: number) {

    }
}
