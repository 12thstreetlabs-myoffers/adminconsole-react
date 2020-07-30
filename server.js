const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();
const buildDir = __dirname + '/build';

// the __dirname is the current directory from where the script is running
app.use(express.static(buildDir));

app.use('/', proxy('18.217.202.7:3001'));
//app.use('/', proxy('18.217.202.123:3001'));
//app.use('/', proxy('localhost:3001'));

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
    res.sendFile(path.resolve(buildDir, 'index.html'));
});

app.listen(port);