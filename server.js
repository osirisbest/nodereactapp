const express = require('express')
const fs = require("fs")
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

app.get('/api/getData', (req, res) => {
    fs.readFile("data.txt", "utf8", function (err, data) {
        if (err) throw err
        console.log(data)
        res.send({ data })
    });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/api/putData', urlencodedParser, function (req, res) {
    if (!req.body) return response.sendStatus(400)
    res.send(req.body)
    console.log(req.body)
    fs.writeFile("data.txt", (req.body.data), function (error) {
        if (error) throw error
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))