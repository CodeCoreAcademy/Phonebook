import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contact from './contact_model.js';

// App config
const app = express();
dotenv.config();

// Middlewares
app.use(express.json())

// DB config
mongoose.connect(process.env.URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})



// API emdpoints
app.get('/', (req, res)=>res.status(200).send("hello world"));

app.post('/newcontact', (req, res)=>{
    const temp = req.body;
    // console.log(temp)
    contact.create(temp, (err, data)=>{
        if(!err)
            res.status(201).send("Data posted in databse: \n"+data)
        else
            res.status(500).send(err)
    })
})

app.get('/contacts', (req, res)=>{
    const temp = req.body;
    // console.log(temp)
    contact.find(temp, (err, data)=>{
        if(!err)
            res.status(200).send("Data retrieved from databse: \n"+data)
        else
            res.status(500).send(err)
    })
})

// Movie.find({ year: { $gte: 1980, $lte: 1989 } }, function(err, arr) {});

app.get('/search', (req, res)=>{
    const temp = req.body.value;
    const query  = contact.where({ number: temp });
    // console.log(temp)
    query.findOne((err, data)=>{
        if(!err)
            res.status(200).send("Data retrieved from databse: \n"+data)
        else
            res.status(500).send(err)
    })
})

// Listener
app.listen(process.env.PORT, ()=>console.log("server is running on http://localhost:"+process.env.PORT))