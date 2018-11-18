import { Component } from '@angular/core';
import { Events, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import SpotifyWebApi from 'spotify-web-api-js';
import { Storage } from "@ionic/storage";
import { SelectSearchableComponent } from "ionic-select-searchable";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import { ApiProvider } from "../../../providers/api/api";

declare var cordova: any;

@IonicPage()
@Component({
    selector: 'page-music',
    templateUrl: 'music.html',
})
export class MusicPage {
    private playlistId: string = '14Ty9bpg6EEjya0elN61N7';
    private spotifyAppUrl: string = 'https://underdogs-app-spotify.herokuapp.com';

    result = {};
    playlist: any = null;
    currentTrack: any = null;
    spotifyApi: any;
    loaded: boolean = false;
    user: any = null;
    selectedTrack: any = null;
    trackSubscription: Subscription;

    constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage,
                private toastCtrl: ToastController, private modalCtrl: ModalController, private events: Events,
                private apiProvider: ApiProvider) {
        this.spotifyApi = new SpotifyWebApi();
        events.subscribe('user:updated', () => this.getUserData());
    }

    /**
     *
     */
    ionViewWillEnter() {
        this.getUserData();
        this.authWithSpotify();
    }

    /**
     *
     */
    private getUserData() {
        this.storage.get('user').then(res => {
            this.user = res;
            this.loaded = true;
        });
    }

    /**
     *
     */
    authWithSpotify() {
        this.currentTrack = null;
        this.playlist = null;

        this.apiProvider.resolve(this.apiProvider.http.get(`${this.spotifyAppUrl}/token`)).subscribe(res => {
            this.spotifyApi.setAccessToken(res.access_token);
            this.getPlaylist();
            this.getCurrentTrack();
        });
    }

    /**
     *
     */
    private getPlaylist() {
        const fields = 'items(track(artists,album(images),name))';

        this.playlist = null;

        this.spotifyApi.getPlaylistTracks(this.playlistId, {fields: fields})
            .then(data => this.playlist = data.items.reverse());
    }

    /**
     *
     */
    private getCurrentTrack() {
        this.spotifyApi.getMyCurrentPlayingTrack()
            .then(data => this.currentTrack = data.item);
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
