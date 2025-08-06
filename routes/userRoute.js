const express = require("express");
const router = express.Router();
const  { handleSignUp,handleLogin,handleLogout } = require("../controllers/userController");
const passport = require("passport");

// /signup | GET
router.get("/signup", (req, res)=>{
    res.render("Layouts/signup.ejs")
});
// /signup | POST
router.post("/signup", handleSignUp);


// /login | GET
router.get("/login", (req, res)=>{
    res.render("Layouts/login.ejs")
});
// /login | POST
router.post("/login", passport.authenticate('local', { successRedirect: '/projects',failureRedirect : '/user/login'}),handleLogin);


router.get("/logout", handleLogout);

module.exports = router;