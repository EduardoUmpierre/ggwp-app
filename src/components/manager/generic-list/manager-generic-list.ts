import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionSheetController, AlertController } from 'ionic-angular';

@Component({
    selector: 'manager-generic-list',
    templateUrl: 'manager-generic-list.html'
})
export class ManagerGenericListComponent {
    @Input('items') items: any[];
    @Input('data') data: any;
    @Input('emptyMessage') emptyMessage: string;

    @Output() onRemove: EventEmitter<any> = new EventEmitter();
    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    constructor(private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
    }

    /**
     * @param {number} id
     * @param {number} key
     */
    showOptions(id: number, key: number) {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Opções',
            buttons: [
                {text: 'Editar', handler: () => this.onEdit.emit([id])},
                {
                    text: 'Remover',
                    role: 'destructive',
                    handler: () => {
                        const alert = this.alertCtrl.create({
                            title: 'Confirmar exclusão',
                            message: 'Deseja remover este item?',
                            buttons: [
                                {text: 'Não', role: 'cancel'},
                                {text: 'Sim', handler: () => this.onRemove.emit([id, key])}
                            ]
                        });

                        alert.present();
                    }
                },
                {text: 'Cancelar', role: 'cancel'}
            ]
        });

        actionSheet.present();
    }

    /**
     * Get the correct subtitle
     *
     * @param {string} subtitle
     * @returns {any}
     */
    getSubtitle(subtitle: any) {
        if (this.data.subtitleMap) {
            return this.data.subtitleMap[subtitle];
        }

        return subtitle;
    }
}
