const express = require('express')
const path = require('path')

const app = express();

app.use(express.static('./dist/practica'))

app.get('/*',(req,res)=>
res.sendFile('index.html',{root:'dist/practica/'}))

app.listen(precess.env.PORT || 8080)