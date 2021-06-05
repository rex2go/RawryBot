import SpotifyWebApi = require("spotify-web-api-node");

const spotify = require('spotify-web-api-node');

export class Spotify {

    public api: SpotifyWebApi;

    public chatControl: boolean = true;

    constructor(credentials: any) {
        const scopes = ["user-read-playback-state", "user-modify-playback-state"],
            redirectUri = credentials.spotifyCallback,
            clientId = credentials.spotifyClientId,
            clientSecret = credentials.spotifyClientSecret

        this.api = new spotify({
            redirectUri: redirectUri,
            clientId: clientId,
            clientSecret: clientSecret
        });
    }

    public connect(refreshToken: string) {
        console.log('Connecting Spotify');

        this.api.setRefreshToken(refreshToken);

        this.api.refreshAccessToken().then(
            (data) => {
                this.api.setAccessToken(data.body["access_token"]);
            },
            (err) => {
                console.error("Access Token konnte nicht erneuert werden", err);
            }
        );

        setInterval(() => {
            this.api.refreshAccessToken().then(
                (data) => {
                    this.api.setAccessToken(data.body["access_token"]);
                },
                (err) => {
                    console.error("Access Token konnte nicht erneuert werden", err);
                }
            );
        }, 1000*60*30);
    }
}