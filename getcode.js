const AdmZip = require('adm-zip');
const request = require('request');
require('dotenv').config()
const file_url = process.env.ENV==='prod'?process.env.ZIP_PATH_PROD:process.env.ZIP_PATH_DEV;
request.get({url: file_url, encoding: null}, (err, res, body) => {
    var zip = new AdmZip(body);
    var zipEntries = zip.getEntries();
    // console.log('zipEntries.length '+zipEntries.length);

    var done = 0;
    zipEntries.forEach((entry) => {
        if (!done){
            if (entry.entryName.match(/2018\.2/)){
                // console.log('zip.readAsText '+zip.readAsText(entry));
                done=1;
                console.log(zip.readAsText(entry))
            }
        }
    });
    if(!done)
        console.log('code failed to download')
});