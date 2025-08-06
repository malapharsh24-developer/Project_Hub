const Project = require("../models/projectModel");

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log("Login required");
        return res.redirect("/user/login");
    }
    next();
}

const isOwner = async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if(!project.owner.equals(req.user._id)){
        console.log("Not authorized ")
        return res.status(403).json({
            message : "Only owner is allowed to edit / delete"
        });
    }
    next();
};

module.exports = { isLoggedIn, isOwner };