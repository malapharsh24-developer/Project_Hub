const Project = require("../models/projectModel");


const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  console.log(projects.length);
  res.render("layouts/home", { projects });
}

const createProject = async (req, res, next) => {
  try {
    const { projects } = req.body;
    const newProject = new Project({ ...projects, owner: req.user._id });
    await newProject.save().then((result) => {
      console.log("Newly added project \n", result);
    });
    res.redirect("/projects");
  } catch (err) {
    next(err);
  }
}

const showProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate('owner');
    res.render("layouts/show", { project });
  } catch (err) {
    next(err);
  }
}

const renderEdit = async (req, res, next) => {
  try {
    let { id } = req.params;
    let project = await Project.findById(id);
    res.render("layouts/edit", { project });
  } catch (err) {
    next(err);
  }
}

const editProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projects } = req.body;
    const project = await Project.findById(id);
    const result = await Project.findByIdAndUpdate(
      id,
      { ...projects },
      { new: true },
      { runValidators: true }
    );

    console.log(`Updated project : \n ${result}`);
    res.redirect(`/projects/${result._id}`);
  } catch (err) {
    next(err);
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).send("No project found");
    }
    console.log("Project Deleted ");
    res.redirect("/projects");
  } catch (err) {
    next(err);
  }
}


module.exports = {
    getAllProjects, 
    createProject,
    showProject,
    renderEdit,
    editProject,
    deleteProject,
}