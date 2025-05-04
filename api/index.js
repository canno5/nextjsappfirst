const express = require("express");
const path = require("path");
const { default: mongoose } = require("mongoose");

const app = express();
const staticPath = path.join(__dirname, "../clined");
const cors = require("cors");
require("dotenv").config();
let port = process.env.PORT;
app.use(express.json());
app.use(cors());
// app.use(express.static(staticPath));

const ContactSchema = new mongoose.Schema({ name: String, phone: String, email: String, message: String });
const ContactModel = mongoose.model('contactsStudents', ContactSchema);

app.get("/", (req, res) => {
    res.send("Cliend Comunication on Server")
});
app.post('/contact',(req, res) => {
    const { name, phone, email, msg } = req.body
    ContactModel.create({ name, phone, email, message: msg });
    res.status(201).json({ msg: "Message Send" });
});
mongoose.connect(process.env.mongoURI).then(() => {
    app.listen(port, () => {
        console.log("I am live to server "+port);
    });
}).catch((err) => {
    console.log('Conntection Faild:' + err);
});
// const data = await  ContactModel.create(req.body);
// const data = await ContactModel.create({ name: name, phone: phone, emai: email, message: message });   