const express = require('express');
const notes = require('./models/notes');
require('dotenv').config();
require('./mongoose').connect();
const note = require('./models/notes')



const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send("<h1>Welcome</h1>");
})

app.post('/createnote',async (req,res)=>{
    try{
        const {owner, title,content,isCompleted} = req.body;
    if(owner && title && content && isCompleted){
     const newnote=  await note.create({
            owner,title,content,isCompleted
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

app.post('/notes',async (req,res)=>{
    const {owner}= req.body
    const foundnote = await note.find({owner})
    res.status(200).send(foundnote)
})

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server live at port 4001")
})