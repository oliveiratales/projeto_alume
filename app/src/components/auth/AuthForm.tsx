import { type ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";

interface AuthFormProps {
  children: ReactNode;
  showLogo?: boolean;
  headerText?: string;
}

export default function AuthForm({
  children,
  showLogo = true,
  headerText,
}: AuthFormProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: 400,
          maxWidth: "100%",
          borderRadius: 2,
          boxShadow: "0 0 15px rgba(2, 73, 83, 0.3)",
          textAlign: "center",
        }}
      >
        {showLogo && (
          <Box
            component="img"
            src={logo}
            alt="Logo Alume"
            sx={{ width: 120, height: "auto", mb: 2, mx: "auto" }}
          />
        )}

        {headerText && (
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: "#004855", mb: 2 }}
          >
            {headerText}
          </Typography>
        )}

        {children}
      </Paper>
    </Box>
  );
}
