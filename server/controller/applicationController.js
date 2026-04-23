import Application from "../models/Application.js";
import mongoose from "mongoose";

export const applyJob = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const { jobId } = req.params;
    
    const alreadyApplied = await Application.findOne({
      job: jobId,
      user: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = new Application({
      job: jobId,
      user: userId,
    });

    await application.save();

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res)=>{
  try{
    const applications = await Application.find({
  user: new mongoose.Types.ObjectId(req.user.id),
  }).populate("job");
  res.json(applications);

} catch(err){
  res.status(500).json({message:"Error Fetching Applications"});
}
};

export const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No Authorized" });
    }

    await application.deleteOne();

    res.json({ message: "Application withdrawn successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
