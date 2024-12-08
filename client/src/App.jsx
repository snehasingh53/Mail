import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Home from "./pages/Home";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Navbar from "./Components/Navbar";
import { routes } from "./routes/routes";
import ErrorComponent from "./Components/common/ErrorComponent";
import SuspenseLoader from "./Components/common/SuspenseLoader";
import Landing from "./pages/Landing"; // Ensure this is imported

const App = () => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get('http://localhost:3001/user', { withCredentials: true })
            .then(response => {
                if (response.data.user) {
                    setUser (response.data.user);
                    setIsLoggedIn(true);
                } else {
                    navigate("/login");
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("An error occurred:", error);
                    navigate("/");
                }
            })
            .finally(() => setLoading(false));
    }, [navigate]); // Add navigate to the dependency array

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState); // Toggle sidebar state
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} /> {/* Pass toggle function to Navbar */}
            <Suspense fallback={<SuspenseLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path={routes.main.path} element={<Landing toggleSidebar={toggleSidebar} />}>
                        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element openDrawer={isSidebarOpen} />} errorElement={<ErrorComponent />} />
                        <Route path="view" element={<routes.view.element />} errorElement={<ErrorComponent />} />
                        <Route index element={<Navigate to="inbox" />} />
                    </Route>
                    <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;