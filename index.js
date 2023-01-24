const express = require('express');
const notes = require('./models/notes');
require('dotenv').config();
require('./mongoose').connect();
const note = require('./models/notes')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send("<h1>Welcome</h1>");
})

app.post('/createnote',async (req,res)=>{
    try{
        const {title,content,isCompleted} = req.body;
    if(title && content && isCompleted){
     const newnote=  await note.create({
            title,content,isCompleted
        })
      newnote.save()
       res.send("Notes saved");
    }
    else{
        res.status(400).send("All the fields are required");
    }
    }
    catch(error){
        console.log(error)
    }

})


app.get('/allnotes',async (req,res)=>{
    const filter = {}
    const All = await note.find(filter);
    res.status(200).json(All);
})

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server live at port 4001")
})