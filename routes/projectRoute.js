const express = require("express");
const router = express.Router();
const { getAllProjects, createProject, showProject,renderEdit,  editProject, deleteProject} = require("../controllers/projectController");
const { isLoggedIn, isOwner } = require("../middlewares/authMiddleware")
// All projects
router.get("/", getAllProjects);

// Create a project
router.get("/add-project", isLoggedIn,(req, res) => {
  res.render("Layouts/add.ejs");
});
router.post("/", isLoggedIn,createProject);

// show route
router.get("/:id", showProject);

// update route
router.get("/:id/edit",isLoggedIn,isOwner, renderEdit);
router.put("/:id",isLoggedIn,isOwner, editProject);
// delete route
router.delete("/:id",isLoggedIn,isOwner, deleteProject);

module.exports = router;