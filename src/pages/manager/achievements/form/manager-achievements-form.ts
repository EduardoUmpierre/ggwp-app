import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-achievements-form',
    templateUrl: 'manager-achievements-form.html',
})
export class ManagerAchievementsFormPage {
    private id: number;
    private product;
    private products = [];
    private drop;
    private drops = [];
    title = 'Nova conquista';
    form: FormGroup;

    constructor(private navCtrl: NavController, private navParams: NavParams, private apiProvider: ApiProvider,
                private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar conquista';
        }

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            experience: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            value: new FormControl('', Validators.required)
        });
    }

    /**
     * Loads the achievement data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('drops').loader().get().subscribe(drops => {
            this.drops = drops;

            this.apiProvider.builder('products').loader().get().subscribe(products => {
                this.products = products;

                if (this.id) {
                    this.apiProvider.builder('achievements/' + this.id).loader().get().subscribe(achievement => {
                        this.form.controls['name'].setValue(achievement.name);
                        this.form.controls['experience'].setValue(achievement.experience);
                        this.form.controls['category'].setValue(achievement.category);
                        this.form.controls['value'].setValue(achievement.value);

                        if (achievement.category == '0') {
                            this.product = achievement.entity;
                        }

                        if (achievement.drops_id) {
                            this.drop = achievement.drops_id
                        }
                    });
                }
            });
        });
    }

    /**
     * Submits the form data to server
     */
    submit() {
        let data = this.form.value;
        let entity = this.product;

        if (data.category == '1') {

        }

        data = Object.assign(data, {entity: entity, drops_id: this.drop});

        if (this.id) {
            data = Object.assign(data, {id: this.id});

            this.apiProvider.builder('achievements/' + this.id).loader().put(data).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('achievements').loader().post(data).subscribe((res) => this.dismiss());
        }
    }

    /**
     * Dismiss the current page
     */
    private dismiss() {
        this.navCtrl.pop();
    }
}
