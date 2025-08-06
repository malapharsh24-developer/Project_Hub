require("dotenv").config({ path: "../.env" });
const initData = require("./data");
const mongoose = require("mongoose");
const Project = require("../models/projectModel");

const addProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Databse connection success");
    await Project.deleteMany();
        initData.data = initData.data.map(project => ({
      ...project,
      owner: "689333e320d83f8c727cda6b"// Dummy owner name as string
    }));

    const result = await Project.insertMany(initData.data);
    console.log(result);
  

  } catch (error) {
    console.log("Error in database initialization", error);
  
}
};

addProjects();
