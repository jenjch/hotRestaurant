var express = require("express")
var path = require("path")

var app = express()
var PORT = 3000
var tableArray = []
var waitListArray = []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

class Reservation {
    constructor(name, email, phone, ID) {
        this.name = name
        this.email = email
        this.phone = phone
        this.ID = ID
    }
}

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/tables", function(req, res){
    res.sendFile(path.join(__dirname, "tables.html"))
})

app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "Reservations.html"))
})

app.get("/api/tables", function(req, res) {
    res.json(tableArray)
})

app.get("api/waitlist", function(req, res) {
    res.json(waitListArray)
})

app.post("/reserve", function(req, res) {
    console.log(tableArray)
    res.json(tableArray)
    var data = req.body
    var newReservation = new Reservation(data.name, data.email, data.phone, data.ID)
    if (tableArray.length === 5){
        waitListArray.push(newReservation)
        console.log(waitListArray)
    }
    else {
        tableArray.push(newReservation)
        console.log(tableArray)
    }
})

app.post("/tables", function(req, res) {
    tableArray = []
    waitListArray = []
    console.log(tableArray)
    console.log("data been cleared")
})

app.listen(PORT, function(){
    console.log("I am listening, coder")
})