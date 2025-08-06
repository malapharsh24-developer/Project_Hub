const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./userModel");

const projectSchema = new Schema({
    title : {
        type : String, 
        required : true
    },
    description : {
        type : String, 
        required : true
    },
    image : {
        type : String, 
        set : v => (v === '') ? undefined : v,
        default : "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    github : {
        type : String, 
        required : true,
        unique : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model("Project", projectSchema);