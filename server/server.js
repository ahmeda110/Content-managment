const express = require("express");
const mysql = require('mysql');
const cors = require('cors')
var path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0) {
            return res.json("Login Successfully")
        } else {
            return res.json("No Record")
        }
    })
})

const appRoutes = require('./routes/appRoutes');
app.use('/api', appRoutes);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});