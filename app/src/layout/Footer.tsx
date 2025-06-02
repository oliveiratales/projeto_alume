import {
  Box,
  Typography,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material";

interface FooterProps {
  sx?: SxProps<Theme>;
}

export default function Footer({ sx }: FooterProps) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 4,
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
        borderTop: `1px solid ${
          theme.palette.mode === "dark" ? "#444" : "#ddd"
        }`,
        color: theme.palette.text.secondary,
        textAlign: "center",
        backdropFilter: "blur(8px)",
        ...sx,
      }}
    >
      <Typography variant="body2" component="div" sx={{ userSelect: "none" }}>
        © {new Date().getFullYear()} Alume - Simulação de Financiamento. Todos
        os direitos reservados.
      </Typography>
    </Box>
  );
}
