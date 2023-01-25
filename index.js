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
       res.status(200).send("Note saved");
    }
    else{
        res.status(400).send("All the fields are required");
    }
    }
    catch(error){
        res.status(400).send(error);
    }

})
app.delete('/delete/:id', (req, res) => {
    note.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

app.get('/allnotes',async (req,res)=>{
    const filter = {}
    const All = await note.find(filter);
    res.status(200).json(All);
})

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server live at port 4001")
})