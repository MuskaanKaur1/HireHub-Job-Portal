import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import {
    Box,
    Button,
    Input,
    Heading,
    VStack,
    Text,
} from "@chakra-ui/react";


const Login= () =>{
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:"",
        password:"",
    });

    const handleChange= (e) =>{
        setForm ({...form, [e.target.name]: e.target.value});
    };

    const handleLogin= async (e)=>{
        e.preventDefault();

        try{
            const res= await axios.post("http://localhost:5000/api/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/jobs")
            console.log("LOGIN RESPONSE", res.data);
        }catch(err){
            console.log("LOGIN ERROR:", err.response?.data);
            alert(err.response?.data?.message || "Login Failed");
        }
    };


    return(
        <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100">

            <Box bg="white" p={8} borderRadius="lg" boxShadow="md" width="350px">
                <Heading mb={6} textAlign="center">
                    Login

                </Heading>

                <form onSubmit={handleLogin}>
                    <VStack spacing={4}>
                        
                        <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}/>
                        <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}/>

                        <Button colorScheme="teal" width="full" type="submit">
                            Login
                        </Button>
                    </VStack>
                </form>
                <Text mt={4} textAlign="center" fontSize="sm">
                    Don't have an account? {" "}
  <Link to="/register" style={{ color: "teal", fontWeight: "bold" }}>
    Signup
  </Link>

                </Text>
            </Box>
        </Box>
    )
}

export default Login;