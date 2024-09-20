//https://stackoverflow.com/a/16099450
const spawn = require('node:child_process').spawn;
const express = require('express');
const app = express.Router();


const ytDlpPath = "/home/ubuntu/nqberddnsnet/yt-download/backend/yt-dlp";


//app.use(express.static('./yt-download/frontend'))
app.use('/', express.static('yt-download/frontend'))
//app.get('/', (req, res) => {res.sendFile(__dirname + "/../frontend/index.html");});


app.get('/api/download', (req, res) => {

    const { url } = req.query;

    const DOWNLOAD_ARGS = [ "-f", "b*[vcodec!=none][acodec!=none]", "-o", "-", url ]
    const FILENAME_ARGS = [ "-f", "b*[vcodec!=none][acodec!=none]", "--print", "%(title)s.%(ext)s", url ]

    // Make verification of url TODO
    const filenameYT = spawn(ytDlpPath, FILENAME_ARGS);
    filenameYT.stdout.on('data', data => {

        // Extension got
        const filename = data.toString().trim();

        res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + filename,
        });

        // Spawn download
        const downloadYT = spawn(ytDlpPath, DOWNLOAD_ARGS);
        downloadYT.stdout.on('data', data => { res.write(data); })
        downloadYT.stdout.on('finish', () => { res.end() });

    })

});

module.exports = app;
