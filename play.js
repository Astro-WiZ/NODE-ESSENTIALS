// REST API IN NODEJS
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose')

const app = express();
const PORT = 8080;

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/sagardb')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("Mongo Error", err));

// Schema of users
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
})

const User = mongoose.model('user', userSchema)
// Default HTML Routes
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
        <ul>
            ${allDbUsers.map((User) => `<li>${User.firstName}  -  ${User.email}</li>`).join("")}
        </ul>
    `
    res.send(html)
})

// REST API ROUTES
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({})
    res.json({ allDbUsers })
})


app.route("/api/users/:id")

    // get --> Get user with unique id
    .get((req, res) => {

    })
    // patch --> Edit the user 
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastName: "Success" })
        return res.json({ stattus: "Success" })
    })

    // delete --> Delete user with specific user id
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success" })
    })


// post --> Add an user at the end of the file with unique id assigned
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.jobtitle
    ) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.jobtitle,
        gender: body.gender,
    });
    console.log("result", result);
    return res.status(201).json({ status: "Success", })


    console.log(body)
});


app.listen(PORT, console.log(`Server Started at http://localhost:${PORT}`));