const express = require('express');
const fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/api/getData', (req, res) => {
    fs.readFile("data.txt","utf8", function (err, data) {
        if (err) throw err
        console.log(data);
        res.send({data});
    });
// res.send({ data: 'Hello From Express' }); test string!
});

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/api/putData',urlencodedParser, function(req,res){
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    
    // res.render('contact-success', {data: req.body});
    res.send(req.body);
    console.log(req)
    //console.log( JSON.parse(req.body));
    //if(!request.body) return response.sendStatus(400);
    //console.log(request.body);
    //console.log(req)

})

app.listen(port, () => console.log(`Listening on port ${port}`));