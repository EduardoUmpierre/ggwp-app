import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from "ionic-angular";

@Component({
    selector: 'manager-product-list',
    templateUrl: 'manager-product-list.html'
})
export class ManagerProductListComponent {
    @Input('products') products: any = [];
    @Input('layout') layout: string;
    @Input('emptyMessage') emptyMessage: string;
    @Input('options') options: boolean = true;

    @Output() onRemove: EventEmitter<any> = new EventEmitter();
    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    constructor(private navCtrl: NavController, private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController) {
        if (!this.emptyMessage) {
            this.emptyMessage = 'Nenhum produto encontrado';
        }
    }

    /**
     * @param {number} id
     * @param {number} key
     */
    click(id: number, key: number) {
        if (this.options) {
            this.showOptions(id, key);
        } else {
            this.navCtrl.push('ManagerProductsFormPage', {id: id})
        }
    }

    /**
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
                        this.onEdit.emit([id, key]);
                    }
                },
                {
                    text: 'Remover',
                    role: 'destructive',
                    handler: () => {
                        let alert = this.alertCtrl.create({
                            title: 'Confirmar exclusão',
                            message: 'Deseja remover este produto?',
                            buttons: [
                                {
                                    text: 'Não',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Sim',
                                    handler: () => {
                                        this.onRemove.emit([id, key]);
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
}
