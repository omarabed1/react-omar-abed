const express= require("express");
const cors= require("cors");
const crypto = require("crypto");

const app=express();
const port=5000;

app.use(cors());
app.use(express.json());

let data=[];

app.get('/',(req,res)=>{
    res.writeHead(200,{
            'Content-Type' : 'application/json',
    });
    res.end(JSON.stringify(data));
})
app.post('/create',(req,res)=>{
    let date_ob = new Date();
    const newdata={
        email:req.body.email,
        password:req.body.password,
        hashEmail:null,
        hashPassword:null,
        date : ("0" + date_ob.getDate()).slice(-2)+'/'+("0" + (date_ob.getMonth() + 1)).slice(-2)+'/'+date_ob.getFullYear(),
    };
    newdata.hashEmail=crypto.createHash('sha256').update(newdata.email).digest('hex');
    newdata.hashPassword=crypto.createHash('sha256').update(newdata.password).digest('hex');
    data.push(newdata);
    console.log(data);
})
app.delete('/:email',(req,res)=>{
    data=data.filter(({email})=> email !== req.params.email);
})
app.listen(port,()=>console.log(`server listen in port: ${port}`))

/*
const dataa=require('/path/to/data.json')
app.get('/dataa',(req,res)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(dataa));
})
*/