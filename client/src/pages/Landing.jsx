import { useState, Suspense } from "react";
import Header from "../Components/Header";
import SideBar from "../Components/Sidebar";
import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "../Components/common/SuspenseLoader";


const Wrapper = styled(Box)({
    display: 'flex',
    height: '100vh', // Ensure the wrapper takes the full height
});

const Content = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
});

const MainContent = styled(Box)({
    display: 'flex',
    flexGrow: 1,
    paddingTop: '64px', // Adjust this value based on the height of your Header
});

const Landing = () => {
    const [openDrawer, setOpenDrawer] = useState(true);

    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    };

    return (
        <>
        <Header toggleDrawer={toggleDrawer} />
        <Wrapper>
            <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
            <MainContent>
                    <Suspense fallback={<SuspenseLoader />}>
                        <Outlet context={{ openDrawer }} /> {/* Pass openDrawer to child routes */}
                    </Suspense>
                </MainContent>
        </Wrapper>
    </>
       
    );
};

export default Landing;