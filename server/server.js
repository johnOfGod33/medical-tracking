const patientRoute = require("./Routes/clientRoute/patientRoute")
const carnetRoute = require("./Routes/clientRoute/carnetRoute")
const hopitalRoute = require("./Routes/adminRoute/hopitalRoute")
const docteurRoute = require("./Routes/adminRoute/docteurRoute")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/patient", patientRoute)
app.use("/carnet", carnetRoute)
app.use("/hopital", hopitalRoute)
app.use("/docteur", docteurRoute)

app.listen(process.env.PORT || 5000)