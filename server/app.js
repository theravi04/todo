const express = require('express');
const app = express();
const cors = require('cors');
require("./DB/connection")
const path = require('path');
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname,"client","build")));
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));
})

app.listen(1000, () => {
    console.log(`Listening on ${1000}`);
});