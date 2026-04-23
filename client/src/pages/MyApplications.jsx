import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Flex, Heading, Button, Text} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const MyApplications = ()=>{
    const [applications, setApplications]= useState([]);

    const handleWithdraw = async (id) => {
        const confirm = window.confirm("Are you sure you want to withdraw?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/applications/withdraw/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Application withdrawn");

            setApplications((prev) =>
                prev.filter((app) => app._id !== id)
            );

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(()=>{
        const fetchApplications = async()=>{
            try{
                const token= localStorage.getItem("token");

                const res= await axios.get("http://localhost:5000/api/applications/my-applications", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setApplications(res.data);
                console.log("Applications response:", res.data);
            }catch(err){
                console.log(err);
            }
        };

        fetchApplications();
    }, []);

    return(

        <>
            <Navbar/>

            <Box p={8} bg="gray.100" minH="100vh">
                <Heading mb={6}>My Applications</Heading>

                <Flex direction="column" gap={4}>
                    {applications.length===0 ?(
                        <Text>No applications yet</Text>
                    ):(
                        applications.map((app) => (
                            <Box key={app._id} bg="white" p={4} borderRadius="lg" boxShadow="sm"w="40%">
                                <Text fontWeight="bold">{app.job?.title || "No title"}</Text>
                                <Text color="gray.600">{app.job
                                    ? `${app.job.company} | ${app.job.location}`
                                    : "Job details unavailable"}</Text>

                            <Button
                                mt={2}
                                size="sm"
                                colorScheme="red"
                                onClick={() => handleWithdraw(app._id)}
                            >
                                Withdraw
                            </Button>

                            </Box>
                           ))
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default MyApplications;