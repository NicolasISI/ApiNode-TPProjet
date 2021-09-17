const express = require ("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;

db.mongoose
    .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Succès de la connection à MongoDB");
        initial();
    })
    .catch(err => {
        console.error("Erreur lors de la connection à MongoDB : ", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count ===0) {
            new Role({
                name:"user"
            }).save(err => {
                if (err) {
                    console.log("error : ", err);
                }
                console.log("Role 'user' ajouté avec succès dans la collection");
            });
            new Role({
                name:"admin"
            }).save(err => {
                if (err) {
                    console.log("error : ", err);
                }
                console.log("Role 'admin' ajouté avec succès dans la collection");
            });
            new Role({
                name:"moderator"
            }).save(err => {
                if (err) {
                    console.log("error : ", err);
                }
                console.log("Role 'moderator' ajouté avec succès dans la collection");
            })
        }
    })
}

var corsOption = {
    origin: "http://localhost:3001"
}

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.json({message: "Welcome to my API !"});
})

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const port = 3001;
app.listen(port, () => {
    console.log("Server is running on port " +port);
})