import { useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

export default function DefaultLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header handleDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex", flexGrow: 1, pt: "64px" }}>
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
          }}
        >
          <Container sx={{ flexGrow: 1 }}>
            <Fade key={location.pathname} in timeout={500}>
              <Box>
                <Outlet />
              </Box>
            </Fade>
          </Container>

          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
