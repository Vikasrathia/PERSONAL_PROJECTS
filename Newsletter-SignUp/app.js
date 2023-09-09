

const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const Email = req.body.email;
    // var Pass = req.body.pass;

    const data ={
        members:[
            {
                email_address:Email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };

    const jsondata=JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/c1e91937ac";
    const options ={
        method:"POST",
        auth:"vikas2:f2f5f506c81b1c4274ae870e348e6442-us21"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsondata);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function () {
    console.log("connected!")
});




//api key --   f2f5f506c81b1c4274ae870e348e6442-us21
//id   --  c1e91937ac