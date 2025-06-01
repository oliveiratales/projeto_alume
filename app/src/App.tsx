import { useColorMode } from "./contexts/ColorModeContext";
import { Button, Container } from "@mui/material";

function App() {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <Container>
      <h1>Simulação de Empréstimos</h1>
      <Button onClick={toggleColorMode}>
        Mudar para {mode === "light" ? "escuro" : "claro"}
      </Button>
    </Container>
  );
}

export default App;
