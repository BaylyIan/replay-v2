const my_api_key = "34c1dba7b5msh5504ac5a1b19019p1e7d94jsnaac98fda7c3a";
const base_url = "https://deezerdevs-deezer.p.rapidapi.com"
const fs = require('fs').promises;

var unirest = require("unirest");

async function getsongs(){

    // var range = [987654, 987655];
    var songs = [];
    //var req = unirest("GET", base_url + "/track/" + range[i]);
    var req = unirest("GET", base_url + "/search");
    req.query({
        q:"Jordan Davis"
    })
    req.headers({
        "x-rapidapi-key": my_api_key,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "useQueryString": true
    });
    
    var res = await new Promise((resolve)=>{
        req.end((res)=>{
            resolve(res);
        })
    });

    if (res.error) throw new Error(res.error);

    // https://www.mysqltutorial.org/mysql-insert-ignore

    await fs.writeFile("./songs100.json", JSON.stringify(res.body.data, null, 2));
}


getsongs();



