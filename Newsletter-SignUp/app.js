const express = require('express');
const bodyParser = require('body-parser');
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const keyValue = "9adc0ffecec53e7e672f502992c50827-us13a";
const listID = 9572313928;

client.setConfig({
    apiKey: keyValue,
    server: "us13",
});

app.get("/", (req, res) => {
    res.sendFile(__dirname  + "/signup.html",function(err, data){
        if(err){
            console.log(err);
        }
    });
});

const run = async (email, status, fistName, lastName, password) => {
  const response = await client.lists.addListMember(listID, {
    email_address: email,
    status: status,
    merge_fields: {
        FNAME: fistName,
        LNAME: lastName,
        PASSWORD: password,
    }
  });

  console.log(response);
};

app.post("/signup", (req, res) => {
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    console.log(req);

    run(email, "subscribed", fName, lName, password);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

