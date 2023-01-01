const express = require("express");
const bodyParser = require("body-parser");
const Notification = require("./notifications.js");
const GenerateToken = require("./generateToken.js"); // only needed if you want to generate your own tokens

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Only use it to generate Access Token for Firebase Notifications using Http v1
GenerateToken.getAccessToken()
    .then((token) => { })
    .catch((err) => console.log("Error: ", err))


app.post("/device", function (req, res) {
    res.send("Sending Notification to a Device...");

    const data = {
        tokenId: req.body.tokenId,
        titulo: req.body.title,
        mensaje: req.body.message
    }

    Notification.sendPushToDevice(data);

})


app.get("/demoDevice", function (req, res) {
    // Here you could receive the token id, titulo and mensage, in this case all these params are already hardcoded

    res.send("Sending Demo Notification to a Device...");
    const data = {
        tokenId: "ftJ0-sPOSzi2YeRfipyimk:APA91bE_ia5ypgcnwVtW59X5dn3ucI-jNUCpnGvCuMojUlu3flLdnPS274PbcgWHn-IIRX5mRFhj5XxQvcFVB4QPa8vuOBdFYU2l6VQGvo31au8Nwb8Ehix7PX6mE40Bub-bhlqBokFa",
        titulo: "Demo Title",
        mensaje: "Message from Nodejs to a Device"
    }
    Notification.sendPushToDevice(data);
});


app.get("/", function (req, res) {
    res.send("Success")
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});