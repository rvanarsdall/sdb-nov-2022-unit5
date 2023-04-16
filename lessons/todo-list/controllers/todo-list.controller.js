const router = require("express").Router();
const fs = require("fs");
const dbPath = "./assets/todo-list.json";
const { v4: uuidv4 } = require("uuid");

// ! Add to the todo list
//  itemName, description, isComplete, _id
router.post("/add", (req, res) => {
  const currentData = read();
  const { itemName, description } = req.body;

  currentData.push({
    itemName: itemName,
    description: description,
    isComplete: false,
    _id: uuidv4(),
  });

  const isSaved = save(currentData);
  res.json({ message: isSaved ? "Item Added" : "We had a problem" });
});

// ! Get all Data

router.get("/view-all", (req, res) => {
  const currentData = read();

  res.json({ list: currentData });
});

// ! Delete based on ID:
//  localhost:4000/todo-list/delete/51b12aca-da5e-4c5f-8b42-3356dd75f06e

router.delete("/delete/:id", (req, res) => {
  const currentData = read();
  const filteredData = currentData.filter(
    (todoItem) => todoItem._id !== req.params.id
  );

  if (filteredData.length === currentData.length) {
    return res.json({
      message: "could not find the id",
    });
  }
  const isSaved = save(filteredData);
  res.json({ message: isSaved ? "Item Delete" : "We had a problem" });
});

router.patch("/update/:id", (req, res) => {
  let currentData = read();
  let itemName = req.body.itemName;
  let description = req.body.description;
  let isComplete = req.body.isComplete;
  const recordToUpdateIndex = currentData.findIndex(
    (todoItem) => todoItem._id === req.params.id
  );

  const isMatchFound = recordToUpdateIndex > -1;

  if (!isMatchFound) {
    return res.json({ message: "record not found" });
  }

  currentData[recordToUpdateIndex] = {
    ...currentData[recordToUpdateIndex],
    itemName: itemName,
    description: description,
    isComplete: isComplete,
  };

  save(currentData);
  res.json({ message: "updated" });
});

function read() {
  const file = fs.readFileSync(dbPath);
  return JSON.parse(file);
}

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      return false;
    }
  });
  return true;
}
module.exports = router;
