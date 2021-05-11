var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
const port = 3001
http.createServer(function(request, response) {
    var filePath = path.join(__dirname, '一些中文.zip');
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
    .listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })