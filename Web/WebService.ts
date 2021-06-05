import {Rawry} from "../Rawry";

export class WebService {

    private allUsernames = [];

    constructor(rawry: Rawry) {
        const express = require('express');
        const nunjucks = require('nunjucks');
        const app = express();
        const port = 3000;

        nunjucks.configure('./Web/Templates', {
            autoescape: true,
            express: app
        })

        app.use(express.static('./Web/Static'));

        app.get('/credits', (req, res) => {
            res.render('credits.html', { names: this.allUsernames.join(',') });
        })

        app.listen(port, () => {
        })
    }

    public checkUsername(username: string) {
        if (this.allUsernames.indexOf(username) == -1) {
            this.allUsernames.push(username);
        }
    }
}