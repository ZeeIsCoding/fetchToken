const axios = require("axios");
const fs = require("fs");

module.exports.fetcher = async (req,res)=>{

    const {userId} = req.query;
    const index = parseInt(userId/10);
    const tokens = JSON.parse(fs.readFileSync('./tokens'));

    if(userId){
        res.status(200).json({
            token : tokens[(index)%(tokens.length)]
        });
    }else{
        res.send(500);
    }
    
}
