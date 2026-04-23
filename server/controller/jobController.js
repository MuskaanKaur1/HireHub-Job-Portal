import Job from "../models/Job.js";

export const createJob = async(req,res)=>{
    try{

        const{title, company, location, salary, description} = req.body;

        const job = new Job({
          title, 
          company,
          location,
          salary,
          description,
          postedBy: req.user._id,  
        });

        await job.save();

        res.status(201).json({
            message:"Job created successfully",
            job,
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res)=>{
  try{
    await Job.findByIdAndDelete(req.params.id);
    res.json({message: "Job deleted"});

  }catch(err){
    res.status(500).json({message: err.message});
  }
};