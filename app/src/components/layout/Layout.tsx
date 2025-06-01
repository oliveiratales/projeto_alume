import { useState } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/Sidebar";

const drawerWidth = 240;

export default function DefaultLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header handleDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Container
          maxWidth="lg"
          sx={{
            mt: "80px",
            mb: "70px",
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Outlet />
        </Container>
      </Box>

      <Footer
        sx={{
          position: "fixed",
          bottom: 0,
          left: { sm: `${drawerWidth}px`, xs: 0 },
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
        }}
      />
    </Box>
  );
}
