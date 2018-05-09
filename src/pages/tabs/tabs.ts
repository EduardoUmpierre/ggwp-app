import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ProductsPage } from '../products/index/products';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    menu = ProductsPage;
    schedule = AboutPage;
    bill = ContactPage;
    music = ContactPage;

    constructor() {

    }
}
