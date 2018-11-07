import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import SpotifyWebApi from 'spotify-web-api-js';
import { Storage } from "@ionic/storage";
import { SelectSearchableComponent } from "ionic-select-searchable";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

declare var cordova: any;

@IonicPage()
@Component({
    selector: 'page-music',
    templateUrl: 'music.html',
})
export class MusicPage {
    private playlistId: string = '14Ty9bpg6EEjya0elN61N7';

    result = {};
    playlist: any = null;
    spotifyApi: any;
    loaded: boolean = false;
    user: any = null;
    selectedTrack: any = null;
    trackSubscription: Subscription;

    constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage,
                private toastCtrl: ToastController, private modalCtrl: ModalController) {
        this.spotifyApi = new SpotifyWebApi();
    }

    /**
     *
     */
    ionViewWillEnter() {
        this.getUserData();
    }

    /**
     *
     */
    private getUserData() {
        this.storage.get('user').then(res => this.user = res);
    }

    /**
     *
     */
    ionViewDidLoad() {
        this.storage.get('music_logged_in').then(res => {
            if (res) {
                this.authWithSpotify();
            } else {
                this.loaded = true;
            }
        });
    }

    /**
     *
     */
    authWithSpotify() {
        const config = {
            clientId: '853c3119d29344d8b473068b3383d91c',
            redirectUrl: 'underdogsspotify://callback',
            scopes: ['playlist-modify-public'],
            tokenExchangeUrl: 'https://underdogs-app-spotify.herokuapp.com/exchange',
            tokenRefreshUrl: 'https://underdogs-app-spotify.herokuapp.com/refresh',
        };

        this.loaded = false;

        cordova.plugins.spotifyAuth.authorize(config)
            .then(({accessToken, encryptedRefreshToken, expiresAt}) => {
                this.result = {access_token: accessToken, expires_in: expiresAt, ref: encryptedRefreshToken};
                this.spotifyApi.setAccessToken(accessToken);
                this.storage.set('music_logged_in', true);
                this.getPlaylist();
            })
            .catch(() => this.loaded = true);
    }

    /**
     *
     */
    private getPlaylist() {
        this.loaded = false;

        const fields = 'items(track(artists,album(images),name))';

        this.spotifyApi.getPlaylistTracks(this.playlistId, {fields: fields})
            .then(data => {
                this.playlist = data.items.reverse();
                this.loaded = true;
            });
    }

    /**
     *
     * @param {{component: SelectSearchableComponent; text: string}} event
     */
    searchTracks(event: {
        component: SelectSearchableComponent,
        text: string
    }) {
        const text = event.text.trim().toLocaleLowerCase();

        if (text.length < 3) {
            return;
        }

        event.component.startSearch();

        // Close any running subscription.
        if (this.trackSubscription) {
            this.trackSubscription.unsubscribe();
        }

        if (!text) {
            // Close any running subscription.
            if (this.trackSubscription) {
                this.trackSubscription.unsubscribe();
            }

            event.component.items = [];
            event.component.endSearch();
            return;
        }

        this.trackSubscription = Observable.fromPromise(this.spotifyApi.searchTracks(text)).subscribe((response: any) => {
            // Subscription will be closed when unsubscribed manually.
            if (this.trackSubscription.closed) {
                return;
            }

            event.component.items = response.tracks.items;
            event.component.endSearch();
        });
    }

    /**
     *
     */
    addTrackToPlaylist() {
        this.spotifyApi.addTracksToPlaylist(this.playlistId, [this.selectedTrack.uri])
            .then(() => {
                this.selectedTrack = null;
                this.getPlaylist();

                this.toastCtrl.create({
                    message: 'Música adicionada com sucesso!',
                    duration: 3000
                }).present();
            });
    }

    /**
     *
     */
    login() {
        const modal = this.modalCtrl.create('LoginPage');

        modal.onDidDismiss(res => {
            if (res.update) {
                this.getUserData();
            }
        });

        modal.present();
    }
}
