import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Navbar from "./Components/Navbar";
import Landing from "./pages/Landing";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser ] = useState(null); // Initialize user as null
    const [loading, setLoading] = useState(true); // Start loading as true
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize based on user presence

    useEffect(() => {
        // Fetch user data if not already set
        if (!user) {
            axios.get('http://localhost:3001/user', { withCredentials: true })
                .then(response => {
                    if (response.data.user) {
                        setUser (response.data.user);
                        setIsLoggedIn(true); // Set logged-in state to true
                    } else {
                        navigate("/login");
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        navigate("/login"); // Redirect to login on unauthorized access
                    } else {
                        navigate("/"); // Handle other errors
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or component
    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/landing" element={<Landing />} />
            </Routes>
        </>
    );
};

export default App;