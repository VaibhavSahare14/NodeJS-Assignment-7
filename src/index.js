const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const initialData = require("./InitialData")

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let newId = initialData.length + 1;

// GET(READ) ALL DATA
app.get("/api/student", (req, res) => {
    try {
        res.json({
            status: "Success",
            initialData
        })
    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        })
    }
})

// GET(READ) DATA USING ID
app.get("/api/student/:id", (req, res) => {
    try {

        const idx = initialData.findIndex((obj => obj.id == req.params.id))
        if (idx == -1) {
            return res.status(404).json({
                status: "Failure",
                message: "Invalid Student ID"
            })
        }

        res.json({
            status: "Success",
            data: initialData[idx]
        })
    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        })
    }
})

// POST(CREATE) DATA USING ID
app.post("/api/student", (req, res) => {
    try {

        if (!req.body.name || !req.body.currentClass || !req.body.division)
            return res.status(400).json({
                status: "Failed",
                message: "Student details are missing"
            })

        initialData.push({
            id: newId,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        });
        newId++;
        res.json({
            status: "Success",
            initialData
        })
    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        })
    }
})

// PUT(UPDATE) DATA USING ID
app.put("/api/student/:id", (req, res) => {
    try {

        const idx = initialData.findIndex((obj => obj.id == req.params.id))
        if (idx == -1) {
            return res.status(400).json({
                status: "Failure",
                message: "Invalid Student ID"
            })
        }
        if (req.body.name) {
            initialData[idx].name = req.body.name;
        }
        if (req.body.currentClass) {
            initialData[idx].currentClass = req.body.currentClass;
        }
        if (req.body.division) {
            initialData[idx].division = req.body.division;
        }
        res.json({
            status: "Success",
            data: initialData[idx]
        })
    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        })
    }
})

// DELETE DATA USING ID
app.delete("/api/student/:id", (req, res) => {
    try {

        const idx = initialData.findIndex((obj => obj.id == req.params.id));
        if (idx == -1) {
            return res.status(404).json({
                status: "Failure",
                message: "Invalid ID"
            })
        }
        initialData.splice(idx, 1);
        res.json({
            status: "Success",
            message: "record deleted"
        });
    } catch (e) {
        res.status(400).json({
            status: "Failure",
            message: e.message
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;