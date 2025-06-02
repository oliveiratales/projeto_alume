import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  getUserSimulations,
  type Simulation,
} from "../../services/simulationService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type ApiError } from "../../types/ApiError";

export default function SimulationsHistory() {
  const [simulacoes, setSimulacoes] = useState<Simulation[]>([]);
  const [filtroData, setFiltroData] = useState("");
  const [filtroValor, setFiltroValor] = useState("");
  const [filtroParcelas, setFiltroParcelas] = useState("");

  const [filtradas, setFiltradas] = useState<Simulation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarSimulacoes() {
      try {
        const dados = await getUserSimulations();
        setSimulacoes(dados);
        setFiltradas(dados);
      } catch (error) {
        const err = error as ApiError;
        if (err.status === 401 || err.status === 403) {
          toast.error("Sessão expirada. Por favor, faça o login novamente.");
          sessionStorage.clear();
          navigate("/login");
          return;
        }

        toast.error(err.data?.message ?? "Erro ao carregar seus dados.");
      }
    }

    carregarSimulacoes();
  }, [navigate]);

  useEffect(() => {
    const resultado = simulacoes.filter((sim) => {
      const matchData = filtroData
        ? new Date(sim.createdAt)
            .toISOString()
            .slice(0, 10)
            .includes(filtroData)
        : true;
      const matchValor = filtroValor
        ? sim.totalAmount.toString().includes(filtroValor)
        : true;
      const matchParcelas = filtroParcelas
        ? sim.numberOfInstallments.toString().includes(filtroParcelas)
        : true;

      return matchData && matchValor && matchParcelas;
    });

    setFiltradas(resultado);
  }, [filtroData, filtroValor, filtroParcelas, simulacoes]);

  const colunas: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Data",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
    },
    {
      field: "totalAmount",
      headerName: "Valor Total (R$)",
      width: 180,
      renderCell: (params) => {
        return params.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      field: "monthlyInterestRate",
      headerName: "Juros Mensal (%)",
      width: 160,
      renderCell: (params) => {
        return params.value + "%";
      },
    },
    {
      field: "numberOfInstallments",
      headerName: "Parcelas",
      width: 120,
    },
    {
      field: "monthlyInstallmentAmount",
      headerName: "Valor da Parcela (R$)",
      width: 180,
      renderCell: (params) => {
        return params.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 1,
          p: 4,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Histórico de Simulações
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            label="Filtrar por data (AAAA-MM-DD)"
            variant="outlined"
            size="small"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
            fullWidth
          />
          <TextField
            label="Filtrar por valor"
            variant="outlined"
            size="small"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
            fullWidth
          />
          <TextField
            label="Filtrar por parcelas"
            variant="outlined"
            size="small"
            value={filtroParcelas}
            onChange={(e) => setFiltroParcelas(e.target.value)}
            fullWidth
          />
        </Stack>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filtradas.map((s) => ({
              ...s,
              id: s.id.toString(),
            }))}
            columns={colunas}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              borderRadius: 1,
              fontFamily: "inherit",
            }}
          />
        </Box>
      </Card>
    </Container>
  );
}
