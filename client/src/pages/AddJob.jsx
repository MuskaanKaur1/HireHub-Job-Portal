import React,{useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {Box, Heading, Input, Button, VStack, Textarea} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddJob = () =>{
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title:"",
        company:"",
        salary:"",
        location:"",
        description:"",
    });

    const handleChange= (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/api/jobs/create", form,
                {
                    headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job added successfully!");

      navigate("/jobs");
                
            
    }catch(err){
        console.log(err);
        alert("Error Adding Job")
    }

};

return(
    <>
    <Navbar/>

    <Box
        minH="100vh"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          width="400px"
        >
        <Heading mb={6} textAlign="center">
            Add Job
        </Heading>

        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder="Job Title"
                name="title"
                onChange={handleChange}
                required
              />

              <Input
              placeholder="Company"
              name="company"
              onChange={handleChange}
              required
              />
              <Input
                placeholder="Location"
                name="location"
                onChange={handleChange}
                required
              />

              <Input
                placeholder="Salary"
                name="salary"
                onChange={handleChange}
              />

              <Textarea
                placeholder="Job Description"
                name="description"
                onChange={handleChange}
                required
              />

              <Button type="submit" colorScheme="teal" width="full">
                Add Job
              </Button>
            </VStack>
          </form>
         </Box>
        </Box>

    </>
);
};

export default AddJob;
