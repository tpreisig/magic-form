import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var userIsAuthorised;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function magicWordChecker(req, res, next) {
    const password = req.body["password"];
    if (password) {
        console.log(password);

        if (password === "Magician") {
            userIsAuthorised = true;
        } else {
            userIsAuthorised = false;
        }
    }
    next();
}

app.use(magicWordChecker);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/views/secret.html");
    } else {
        res.sendFile(__dirname + "/views/index.html");
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});


