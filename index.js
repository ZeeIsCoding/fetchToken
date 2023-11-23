const express = require('express');
const getToken = require("./getToken");

const app = express();

const port = 8001;

app.use(express.json());


app.get('/',(req,res)=>{
    res.end("you are on the home page");
});
app.get('/fetchtoken',require("./tokenFetcher").fetcher);


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in starting server ${err}`);
        return;
    }

    console.log(`server is running at port : ${port}`)
})
