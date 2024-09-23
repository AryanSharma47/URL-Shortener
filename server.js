const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const exp = require('constants');
const app = express();
const uuid = require('uuid');


app.use(express.static('.'));
app.use(express.urlencoded({extended:true}));

app.post('/shortURL',(req,res)=>{
    let url = req.body.url;
    let v4ID = uuid.v4();

    let arr = fs.readFileSync(path.join(__dirname,'/links.json'),'utf-8');
    let links = JSON.parse(arr);

    let myID = links.find(val => val.url === url);

    if (myID){
        res.send(`Done and here is your short URL: ${v4ID}`);
    }
    else{
    links.push({url,v4ID});
    fs.writeFileSync(path.join(__dirname,'/links.json'),JSON.stringify(links));
    res.send(`Done and here is your short URL: ${v4ID}`);
    }
})

app.get('/:id',(req,res)=>{
    let myurl = req.params.id;

    let arr = fs.readFileSync(path.join(__dirname,'/links.json'),'utf-8');
    let links = JSON.parse(arr);

    let myID = links.find(val => val.v4ID === myurl);

    if (myID)
        res.redirect(myID.url); 
    else
        res.status(404).send('URL not found');
})

app.listen(3000,()=>{
    console.log('Server Started...');
});