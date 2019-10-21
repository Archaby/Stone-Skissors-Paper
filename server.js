const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    app.use(express.static(__dirname));
    res.sendFile(__dirname + '/index.html');
});
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }    
        console.log(`server is listening on ${port}`);
});