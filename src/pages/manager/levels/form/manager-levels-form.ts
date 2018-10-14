import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
    selector: 'page-manager-levels-form',
    templateUrl: 'manager-levels-form.html',
})
export class ManagerLevelsFormPage {
    private id: number;
    title = 'Novo nível';
    form: FormGroup;

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
        if (this.id) {
            this.apiProvider.builder('levels/' + this.id).loader().get().subscribe(level => {
                this.form.controls['number'].setValue(level.number);
                this.form.controls['experience'].setValue(level.experience);
            });
        }
    }

    /**
     *
     */
    submit() {
        if (this.id) {
            this.apiProvider.builder('levels/' + this.id).loader().put(Object.assign({}, {id: this.id}, this.form.value)).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('levels').loader().post(this.form.value).subscribe((res) => this.dismiss());
        }
    }
}
