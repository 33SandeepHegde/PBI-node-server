const express=require('express')
const app=express();
const route=express.Router();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const axios = require('axios');

app.get('/getaadtoken',async (req,res)=>{

let tokenRes=await getAccesTokenAzure();
res.send(tokenRes);

})

async function  getAccesTokenAzure(){
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
    
      };
    const apiUrl = 'https://login.microsoftonline.com/<tenant_ID>/oauth2/token'; 
    const loginCred={
        client_id:'REPLACE <Client ID>',
        resource:'https://analysis.windows.net/powerbi/api',
        grant_type:'password',
        username:'REPLACE <Power BI username>',
        password:'REPLACE <Power BI password>',
        client_secret:'REPLACE <client secret>'
    };
    const formData = new URLSearchParams();
    for (const key in loginCred) {
      formData.append(key, loginCred[key]);
    }
    let tokenAad= await axios.post(apiUrl, formData,config)
    return tokenAad.data;
}


  app.listen(5200,()=>{
    console.log("Server running on port 5200");
  });