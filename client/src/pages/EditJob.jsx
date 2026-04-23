import React, {useEffect, useState} from "react";
import axios from  "axios";
import {Box, Input, Button, Heading} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditJob= ()=>{
    const {id}= useParams();
    const navigate= useNavigate();

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
    });

    useEffect(()=>{
        const fetchJob = async()=>{
            const res= await axios.get(`http://locahost:5000/api/jobs`);
            const found = res.data.find((j)=> j._id ===id);
            setJob(found);
        }

        fetchJob();
    }, [id]);

    const handleChange= (e)=>{
        setJob({...job, [e.target.name]: e.target.value});
    };

    const handleUpdate = async()=>{
        try{
            const token= localStorage.getItem("token");

            await axios.put(`http://localhost:5000/api/jobs/${id}`, job,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Job updated!");
            navigate("/manage-jobs");
        } catch(err){
            console.log(err);
        }
    };

    return(

        <>
            <Navbar/>

            <Box p={8}>
                <Heading mb= {6}> Edit Job</Heading>

                <Input name="title" value={job.title} onChange={handleChange} placeholder="Job Title " mb={3}/>
                <Input name="company" value={job.company} onChange={handleChange} placeholder="Company Name "  mb={3}/>
                <Input name="location" value={job.location} onChange={handleChange} placeholder="Company Location "  mb={3}/>
                <Input name="salary" value={job.salary} onChange={handleChange} placeholder="Salary" mb={3}/>
                <Input name="description" value={job.description} onChange={handleChange} placeholder="Description" mb={3}/>

                <Button colorScheme="teal" onClick={handleUpdate}>
                    Update Job
                </Button>

            </Box>
        </>
    );
};

export default EditJob;