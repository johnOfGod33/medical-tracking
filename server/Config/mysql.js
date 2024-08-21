const mysql = require("mysql2")

const database = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "!AlfredFreedrich66",
    database: "medical_record"
})

database.connect((error)=>{
    if (error) throw error
    console.log("database connected sucessfuly");
})

module.exports = database