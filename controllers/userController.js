const User = require("../models/userModel");

const handleSignUp = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({email, username});
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            console.log("USER SIGNUP SUCCESS");
            res.redirect("/projects");
        })
    } catch (error) {
        next(error)
    }
}
const handleLogin = (req, res, next) => {
    try {
        console.log("USER LOGIN SUCCESS");
        res.redirect("/projects");
    } catch (error) {
        next(error);
    }
}
const handleLogout = (req, res, next) => {
    try {
        req.logout((err)=>{
            if(err) {
                return next(err);
            }
            res.redirect("/projects");
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleSignUp,
    handleLogin,
    handleLogout
}