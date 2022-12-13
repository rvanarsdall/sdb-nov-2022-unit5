const express = require("express");
const app = express();
const PORT = 4000;
const practiceController = require("./controllers/practice.controller");

app.use(express.json());
// This will serve the static html page that is inside the public folder
app.use(express.static(`${__dirname}/public`));

// ! any traffic coming in that is has the practice in the url ex: localhost:4000/practice will go to the practiceController for more routing options.
app.use("/practice", practiceController);
console.log(__dirname);
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
