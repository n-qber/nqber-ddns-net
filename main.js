const express = require('express');
const app = express();
// For websocket communications
require('express-ws')(app);

const easyTransfer = require('./easy-transfer/backend/app');
const ytDownload = require('./yt-download/backend/app');
const happyChat = require('./happy-chat/backend/app');




app.use('/easy-transfer', easyTransfer);
app.use('/yt-download', ytDownload);
app.use('/happy-chat', happyChat);

const path = require('path');
app.get('/', (req, res) => {
    //return res.redirect(301, "/easy-transfer");
    return res.sendFile(__dirname + "/index.html")
});
app.use('/icons', express.static('icons'))

app.get('/Islets.zip', (req, res) => {
   return res.sendFile(__dirname + "/Islets.zip");
});



app.listen(8000);
