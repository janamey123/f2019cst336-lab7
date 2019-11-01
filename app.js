const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function (req, res) {
    let keywords = ["flower", "beach", "ocean", "california", "surfing"];
    let random = Math.floor(Math.random() * 5);
    let keyword = keywords[random];
    let orientation = "horizontal";
    let parsedData = await getImages(keyword, orientation);

    let len = parsedData.hits.length;
    let number1 = Math.floor(Math.random() * len);
    let number2 = Math.floor(Math.random() * len);
    while (number1 == number2) {
        number2 = Math.floor(Math.random() * len);
    }
    let number3 = Math.floor(Math.random() * len);
    while (number1 == number3 || number2 == number3) {
        number3 = Math.floor(Math.random() * len);
    }
    let number4 = Math.floor(Math.random() * len);
    while (number1 == number4 || number2 == number4 || number3 == number4) {
        number4 = Math.floor(Math.random() * len);
    }


    console.dir("parsedData: " + parsedData); //displays content of the object
    res.render("index", {
        "image1": parsedData.hits[number1].largeImageURL,
        "image1Like": parsedData.hits[number1].likes,
        "image2": parsedData.hits[number2].largeImageURL,
        "image2Like": parsedData.hits[number2].likes,
        "image3": parsedData.hits[number3].largeImageURL,
        "image3Like": parsedData.hits[number3].likes,
        "image4": parsedData.hits[number4].largeImageURL,
        "image4Like": parsedData.hits[number4].likes
    });
}); //root route

app.get("/results", async function (req, res) {
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orientation = req.query.select;
    let parsedData = await getImages(keyword, orientation);
    let len = parsedData.hits.length;
    let number1 = Math.floor(Math.random() * len);
    let number2 = Math.floor(Math.random() * len);
    while (number1 == number2) {
        number2 = Math.floor(Math.random() * len);
    }
    let number3 = Math.floor(Math.random() * len);
    while (number1 == number3 || number2 == number3) {
        number3 = Math.floor(Math.random() * len);
    }
    let number4 = Math.floor(Math.random() * len);
    while (number1 == number4 || number2 == number4 || number3 == number4) {
        number4 = Math.floor(Math.random() * len);
    }
    res.render("results", {
        "image1": parsedData.hits[number1].largeImageURL,
        "image1Like": parsedData.hits[number1].likes,
        "image2": parsedData.hits[number2].largeImageURL,
        "image2Like": parsedData.hits[number2].likes,
        "image3": parsedData.hits[number3].largeImageURL,
        "image3Like": parsedData.hits[number3].likes,
        "image4": parsedData.hits[number4].largeImageURL,
        "image4Like": parsedData.hits[number4].likes
    });
});//results route

//Returns all data from the Pixabay API as JSON format
function getImages(keyword, orientation) {
    return new Promise(function (resolve, reject) {
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=' + keyword + '&orientation=' + orientation,
            function (error, response, body) {
                if (!error && response.statusCode == 200) { //no issues in the request
                    let parsedData = JSON.parse(body); //converts string to JSON
                    resolve(parsedData);
                    //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                    //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                    //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                } else {
                    reject(error);
                    console.log(response.statusCode);
                    console.log(error);
                }
            });//request
    });
}

//starting server
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Express server is running...");
});