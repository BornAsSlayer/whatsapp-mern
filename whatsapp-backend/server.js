//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app=express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1331075",
    key: "a0909c6bc917edc7b906",
    secret: "3224121d06b99eb7175a",
    cluster: "ap3",
    useTLS: true
  });

//middleware
app.use(express.json());

app.use(cors());

//DB config
const connection_url = 'mongodb+srv://admin:fPy2xhh2KeM7FFUm@cluster0.18hhn.mongodb.net/whatsapp?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useNewUrlParser: true,
});

const db = mongoose.connection

db.once('open',() => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log("A Change Occured",change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
                {
                    name: messageDetails.name,
                    Messages: messageDetails.message
                }
            );
        }else {
            console.log('Error Triggering Pusher');
        }
    })

});

//api routes
app.get('/',(req,res)=>res.status(200).send('Hello'));

app.get('/messages/sync', (req,res) => {
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res)=> {
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data) => {
        if(err) {
            res.status(500).send(err)
        }else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`));