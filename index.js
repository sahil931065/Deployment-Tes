// This is an Express application setup
import express from "express";
const app = express();

// port number
const port = 3002;

// start the server
app.use(express.json())

let teaData = [];
let nextId = 1;


// endpoint to post a new tea
// first setting url where we want to proform the action, second setting the action
// by arrow function we can use the req and res objects
// at last we send the response as status and data

app.post("/teas" , (req, res) =>{
    const {name , price} = req.body 
    const newTea = {id: nextId++, name , price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})


app.get("/teas" , (req ,res) =>{
    res.status(200).send(teaData)
})


app.get("/teas/:id" , (req, res) =>{
   let tea =  teaData.find(t => t.id === parseInt(req.params.id))
   if(!tea){
    return res.status(404).send("Not Found")
   }
   else{
    res.status(201).send(tea)
   }
})


//Update 
app.put("/teas/:id" , (req, res) => {
    let tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("Not Found")
    }else{
        const {name , price} = req.body;
        tea.name = name;
        tea.price = price;
        res.status(201).send(tea);
    }
})


// Delete
app.delete("/teas/:id", (req , res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send("Not Found")
    }else{
        teaData.splice(index , 1);
        res.status(204).send();
    }
})
 



// main app is listening here
app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})