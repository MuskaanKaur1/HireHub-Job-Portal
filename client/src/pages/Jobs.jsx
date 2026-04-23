import React,{useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
//import "./Jobs.css";

import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Input,
  InputGroup, 
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";


const Jobs=()=>{
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [search, setSearch] = useState("");



    useEffect(() =>{
        const fetchJobs = async()=>{
            try{
                const res = await axios.get("http://localhost:5000/api/jobs");
                console.log(res.data);
                setJobs(res.data);
            }catch(err){
                console.log(err);
            }
        };

        const fetchAppliedJobs= async ()=>{
    try{
        const token = localStorage.getItem("token");

        const res= await axios.get("http://localhost:5000/api/applications/my-applications",

        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

        const appliedIds = res.data.map((app) => app.job?._id || app.job);
        setAppliedJobs(appliedIds);
    }catch(err){
        console.log(err);
    }
}

        fetchJobs();
        fetchAppliedJobs();

    }, []);

    const handleApply = async (jobId) => {
  try {
        const token = localStorage.getItem("token"); 

    await axios.post(
      `http://localhost:5000/api/applications/apply/${jobId}`, {},
      {
        headers:{
            Authorization:`Bearer ${token}`,
        },
      }
    );

    setAppliedJobs((prev) => [...prev, jobId]);

    alert("Applied successfully!");
  } catch (err) {
    console.log(err);

    if (err.response?.data?.message === "Already applied") {
      alert("You already applied!");
    } else {
      alert("Error applying");
    }
  }
};

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
        );


    return(
        <>
        <Navbar/>
        
        <Box p={8} bg="gray.100" minH="100vh">
            <Flex 
                align="center" 
                mb={6} 
                flexWrap="wrap"
                gap={4}
            >
    <Heading size="lg">All Jobs</Heading>

    <Box w={{ base: "100%", md: "350px" }}>
      <InputGroup startElement={<FiSearch color="gray" />}>
        <Input
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="white"
          borderRadius="lg"
        />
      </InputGroup>
    </Box>
  </Flex>
            
            <Flex wrap= "wrap" gap={6}>

            {jobs && jobs.length===0?(
                <Text>No jobs found</Text>
            ):(
                filteredJobs?.map((job)=>(
                    <Box 
                    key={job._id} 
                    bg="white"
                        p={5}
                        borderRadius="xl"
                        boxShadow="md"
                        width="300px"
                        transition="0.3s"
                        _hover={{transform:"scale(1.03)", boxShadow:"lg"}}
                    >
                        <Heading size="md" mb={2}>  {job.title}</Heading>
                        <Text fontWeight="bold">Company: {job.company}</Text>
                        <Text color="gray.600">Location: {job.location}</Text>
                        <Text color="green.500" fontWeight="bold">Salary: {job.salary}</Text>

                        {appliedJobs.includes(job._id.toString()) ? (
                            <Button mt={4} 
                            width="full" 
                            colorScheme="gray" isDisabled> 
                                 Applied
                            </Button>
                        ) : (
                            <Button
                            mt={4}
                            width="full"
                            colorScheme="teal"
                            onClick={() => handleApply(job._id)}
                            >
                                Apply Now
                            </Button>
                            )}
                    </Box>
                ))
            )}
               </Flex>

            </Box>
            </>
    )
}


export default Jobs;