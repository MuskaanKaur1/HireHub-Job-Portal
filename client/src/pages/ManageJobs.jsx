import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
   const navigate= useNavigate();

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <Box p={8}>
        <Heading mb={6}>Manage Jobs</Heading>

        <Flex direction="column" gap={4}>
          {jobs.map((job) => (
            <Box key={job._id} p={4} bg="white" borderRadius="lg">
              <Text fontWeight="bold">{job.title}</Text>
              <Text>{job.company}</Text>

              <Flex gap={3} mt={2}>
                
                <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => navigate(`/edit-job/${job._id}`)}
                  >
                    Edit
                  </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default ManageJobs;