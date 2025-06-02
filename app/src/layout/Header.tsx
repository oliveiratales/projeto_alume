import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../contexts/ColorModeContext";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.svg";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

export default function Header({ handleDrawerToggle }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const name = sessionStorage.getItem("name") || "Usuário";

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    handleClose();
    navigate("/login");
  };

  const handleMyAccount = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
        color: theme.palette.text.secondary,
        borderBottom: `1px solid ${
          theme.palette.mode === "dark" ? "#444" : "#ddd"
        }`,
        position: "fixed",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: 2,
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="abrir menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src={logo}
            alt="Logo"
            style={{ height: 30, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            aria-label="toggle theme"
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isSmallScreen && (
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 400 }}
              noWrap
            >
              {name}
            </Typography>
          )}

          <IconButton
            onClick={handleMenu}
            color="inherit"
            aria-label="account menu"
            size={isSmallScreen ? "small" : "medium"}
          >
            <AccountCircle fontSize={isSmallScreen ? "small" : "medium"} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMyAccount}>Meu Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
