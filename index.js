const express = require('express')
const app = express()
// const port = 3000;
const port = 80;
var AdmZip = require('adm-zip');
var request = require('request');
// var file_url = 'http://localhost:3001';
var file_url = 'http://idea.medeming.com/a/jihuoma.zip';

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
            ress.send('error')
    });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})