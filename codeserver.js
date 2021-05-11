const express = require('express')
require('dotenv').config()
const AdmZip = require('adm-zip');
const request = require('request');
const app = express()
const port = process.env.ENV==='prod'?process.env.PORT_PROD:process.env.PORT_DEV;
var file_url = process.env.ENV==='prod'?process.env.ZIP_PATH_PROD:process.env.ZIP_PATH_DEV;

app.get('/', (req, res) => {
    let ress = res;
    request.get({url: file_url, encoding: null}, (err, res, body) => {
        var zip = new AdmZip(body);
        var zipEntries = zip.getEntries();
        console.log('zipEntries.length '+zipEntries.length);

        var done = 0;
        zipEntries.forEach((entry) => {
            if (!done){
                if (entry.entryName.match(/2018\.2/)){
                    // console.log('zip.readAsText '+zip.readAsText(entry));
                    done=1;
                    ress.send(zip.readAsText(entry))
                }
            }
        });
        if(!done)
            ress.send('code failed to download')
    });

})

app.listen(port, () => {
    console.log(`jihuoma listening at http://localhost:${port}`)
})