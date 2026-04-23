import React from "react";
import {Box, Flex, Heading, Button, Text, Menu, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar= () =>{
    const navigate = useNavigate();

    const userData = localStorage.getItem("user");

    let user = null;

    try {
    user = userData && userData !== "undefined"
        ? JSON.parse(userData)
        : null;
    } catch (err) {
    user = null;
    }

    const handleLogout=() =>{
        localStorage.clear();
        navigate("/login");
    };

    return(
        <Flex 
        bg="teal.500"
        color="white"
        p={4}
        justifyContent="space-between"
        alignItems="center"
        >

            <Heading size="md" cursor="pointer" onClick={()=>navigate("/jobs")}>
                HireHub
            </Heading>
            <Text cursor="pointer" onClick={() => navigate("/my-applications")}>
                My Applications
            </Text>
            
            {user?.role === "admin" && (
                <Menu.Root>
                    <Menu.Trigger asChild>
                    <Button colorScheme="blue">Manage Jobs</Button>
                    </Menu.Trigger>

                    <Menu.Content>
                    <Menu.Item onClick={() => navigate("/add-job")}>
                        Add Job
                    </Menu.Item>

                    <Menu.Item onClick={() => navigate("/manage-jobs")}>
                        Delete/Edit
                    </Menu.Item>
                    </Menu.Content>
                </Menu.Root>
                )}

            <Flex alignItems="center" gap={4}>
                <Text>{user?.name || "Guest"}</Text>

                <Button colorScheme="red" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </Flex>

        </Flex>
    )
}

export default Navbar;
