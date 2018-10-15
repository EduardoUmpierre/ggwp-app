import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'page-manager-levels-form',
    templateUrl: 'manager-levels-form.html',
})
export class ManagerLevelsFormPage {
    private id: number;
    title = 'Novo nível';
    form: FormGroup;
    drops = [];
    selectedDrops = [];

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider,
                private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar nível';
        }

        this.form = this.formBuilder.group({
            number: new FormControl('', Validators.required),
            experience: new FormControl(0, Validators.required)
        });
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * Loads the level data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('drops').loader().get().subscribe(drops => {
            this.drops = drops;

            if (this.id) {
                this.apiProvider.builder('levels/' + this.id).loader().get().subscribe(level => {
                    this.form.controls['number'].setValue(level.number);
                    this.form.controls['experience'].setValue(level.experience);

                    let drops = level.drops;

                    drops.forEach((e, i) => {
                        drops[i] = e.id;
                    });

                    this.selectedDrops = drops;
                });
            }
        });
    }

    /**
     *
     */
    submit() {
        const drops = {
            drops: this.selectedDrops
        };
        let data = Object.assign({}, this.form.value, drops);

        if (this.id) {
            data = Object.assign({}, {id: this.id}, data);

            this.apiProvider.builder('levels/' + this.id).loader().put(data).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('levels').loader().post(data).subscribe((res) => this.dismiss());
        }
    }
}
