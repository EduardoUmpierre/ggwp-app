import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, Events } from 'ionic-angular';

@Component({
    selector: 'expandable-header',
    templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {
    @Input('scrollArea') scrollArea: any;
    @Input('headerHeight') headerHeight: number;

    private newHeaderHeight: any;
    private user = null;

    constructor(private element: ElementRef, private renderer: Renderer2, private storage: Storage,
                private modalCtrl: ModalController, private events: Events) {
        events.subscribe('user:updated', (user) => {
            this.updateUserData();
        });
    }

    ngOnInit() {
        // this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
        //
        // this.scrollArea.ionScroll.subscribe((ev) => {
        //     this.resizeHeader(ev);
        // });
    }

    ngOnChanges() {
        this.updateUserData();
    }

    // ionViewWillLeave() {
    //     this.events.unsubscribe('user:updated');
    //     console.log('unsubcribed');
    // }

    /**
     * Updates the user data from local storage
     */
    private updateUserData() {
        this.storage.get('user').then(user => this.user = user);
    }

    /**
     * Calls the login page
     */
    loginModal() {
        const modal = this.modalCtrl.create('LoginPage');
        modal.present();
    }

    /**
     * Calls the profile page
     */
    goToProfile() {
        const modal = this.modalCtrl.create('ProfilePage');
        modal.present();
    }

    /**
     * Animates the header on scroll
     *
     * @param ev
     */
    resizeHeader(ev) {
        ev.domWrite(() => {
            this.newHeaderHeight = this.headerHeight - Math.floor(ev.scrollTop * 0.5);

            if (this.newHeaderHeight < 0) {
                this.newHeaderHeight = 0;
            }

            if (this.newHeaderHeight > 0) {
                const contentElementRef = this.scrollArea._elementRef.nativeElement;
                const contentTabsRef = this.scrollArea._tabs;
                let tabRefHeight = this.newHeaderHeight;
                const tabYMargin = this.newHeaderHeight - this.headerHeight;

                if (contentTabsRef) {
                    this.renderer.setStyle(contentTabsRef._tabbar.nativeElement, 'transform', 'translate3d(0, ' + tabYMargin + 'px, 0)');

                    tabRefHeight = this.newHeaderHeight + 56;
                }

                const scrollContent = tabRefHeight;

                // this.renderer.setStyle(this.element.nativeElement, 'height', tabHeight + 'px');
                this.renderer.setStyle(contentElementRef.lastChild, 'margin-top', scrollContent + 'px');
                this.renderer.setStyle(document.querySelector('#user-header.compact'), 'opacity', this.map(this.newHeaderHeight, 30, 90, 0, 100)/100);
                // this.element.nativeElement.children[0]
            }
        });
    }

    private map(num, in_min, in_max, out_min, out_max) {
        let result = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

        return result < 0 ? 0 : result;
    }
}
