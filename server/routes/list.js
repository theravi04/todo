const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// create task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({ title, body, user: id });
    await list.save();
    existingUser.list.push(list);
    await existingUser.save();

    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;

    await List.findByIdAndUpdate(req.params.id, { title, body });
    // List.save();
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await List.findByIdAndDelete(req.params.id);
    //   List.save();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

// get task
router.get("/getTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id });
    if (!list) {
      return res.status(404).json({ message: "List not found for this user" });
    }
    if (list.length === 0) {
      return res.status(404).json({ message: "No Task Present" });
    }
    res.status(200).json({ list: list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
