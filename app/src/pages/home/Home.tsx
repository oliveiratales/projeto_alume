import { Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bem-vindo à Home
      </Typography>
      <Typography variant="body1" gutterBottom>
        Essa é a página inicial do sistema com suporte a tema claro e escuro.
      </Typography>
      <Button variant="contained" color="primary">
        Ação de Exemplo
      </Button>
    </>
  );
}
