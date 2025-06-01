import { Button, CircularProgress, type ButtonProps } from "@mui/material";
import { type ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  children: ReactNode;
}

export default function CustomButton({
  loading = false,
  children,
  disabled,
  sx,
  ...rest
}: CustomButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      sx={{
        backgroundColor: "#00dac0",
        color: "#fff",
        "&:hover": {
          backgroundColor: loading ? "#00dac0" : "#02b39a",
        },
        ...sx,
      }}
      {...rest}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}
