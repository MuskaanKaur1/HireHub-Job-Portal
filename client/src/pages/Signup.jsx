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

const Signup= () =>{
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
    });

    const handleChange= (e) =>{
        setForm ({...form, [e.target.name]: e.target.value});
    };

    const handleSignup= async (e)=>{
        e.preventDefault();

        try{
            const res= await axios.post("http://localhost:5000/api/auth/register", form);
            alert ("Signup Succesful!")
            console.log(res.data)
            navigate("/login");
        }catch(err){
    console.log(err.response?.data);   // 👈 IMPORTANT
    alert(err.response?.data?.message || "Signup Failed");
}

    };

    return(
        <Box
        min="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100">

            <Box bg="white" p={8} borderRadius="lg" boxShadow="md" width="350px">
                <Heading mb={6} textAlign="center">
                    SignUp

                </Heading>

                <form onSubmit={handleSignup}>
                    <VStack spacing={4}>
                        <Input
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}/>
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

                        <Button colorScheme="teal" color="white" width="full" type="submit">
                            Signup
                        </Button>
                    </VStack>
                </form>
                <Text mt={4} textAlign="center" fontSize="sm">
                    Already have an account?{" "}
                    <Link to="/login" style={{color: "teal", fontWeight: "bold"}}>
                        Login
                    </Link>

                </Text>
            </Box>
        </Box>
    )
}

export default Signup;