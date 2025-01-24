const create = async (req, res) => {
  try {
    const newTask = await new Task({
      title: req.body.title,
      description: req.body.description,
    });
    if (!newTask) {
      return res.status(400).json({ error: "Cannot create your account" });
    }

    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    console.log("error in create task controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const tasks = await Task.find();

    // If the task is not found or the user is not the one who posted it
    if (!tasks) {
      return res.status(403).json({
        message: "No tasks found",
      });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.log("error in list tasks controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const retrieveTaskByID = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log("error in taskById controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const retrieve = async (req, res) => {
  try {
    // Return the task if the user is authorized
    return res.json(req.user);
  } catch (error) {
    console.log("error in retrieve task controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    let task = req.task;
    task = extend(user, req.body);
    task.updated = Date.now();
    await task.save();

    // Return the updated task
    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in update task controller: ", error.message);
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    let task = req.task;

    if (!task) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    console.log("Error in remove task controller: ", error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export default {
  create,
  list,
  retrieveTaskByID,
  retrieve,
  update,
  remove,
};
