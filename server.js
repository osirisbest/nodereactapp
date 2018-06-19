const express = require('express');
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    fs.readFile("data.txt","utf8", function (err, data) {
        if (err) throw err
        console.log(data);
        res.send({data});
    });
// res.send({ data: 'Hello From Express' }); test string!
});

app.listen(port, () => console.log(`Listening on port ${port}`));