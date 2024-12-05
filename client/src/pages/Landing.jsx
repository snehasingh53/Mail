import { useState, Suspense } from "react";
import Header from "../Components/Header";
import SideBar from "../Components/Sidebar";
import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import EmailList from "../Components/EmailList";

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
                <Content>
                    <MainContent>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet context={{ openDrawer }} />
                        </Suspense>
                        <EmailList />
                    </MainContent>
                </Content>
            </Wrapper>
        </>
    );
};

export default Landing;