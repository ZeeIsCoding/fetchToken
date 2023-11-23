const axios = require("axios");
const fs = require("fs");

const clientCredentials = ["WmlzaGFuQWwtbWF4bWlucHItUFJELTUyZjU5YTY4NS03ZjU5NTIxYTpQUkQtZmNjZTJmMjA3NTc3LWMyNjktNGUxMy1iZTljLWU0MTU="];

async function getToken(index){

    const tokens = JSON.parse(fs.readFileSync('./tokens'));

    try{
        const credentials = new URLSearchParams();
        credentials.append('grant_type', 'client_credentials');
        credentials.append('scope', 'https://api.ebay.com/oauth/api_scope');

        const response = await axios({
            method: 'post',
            url: 'https://api.ebay.com/identity/v1/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${clientCredentials[index]} `,
            },
            data: credentials,
        })
        
        tokens[index] = response.data.access_token;

        fs.writeFileSync("./tokens",JSON.stringify(tokens));

        console.log("token updated");

    }catch(err){
        console.log("Error in fetching tokens",err)
    }
}

for(let i=0 ; i<clientCredentials.length ; i++){
    getToken(i);
    const intervalInMilliseconds = (60 * 60 * 1 + 60 * 55) * 1000;
    setInterval(()=>getToken(i),intervalInMilliseconds);
}