import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Divider,
  Skeleton,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  getUserSimulations,
  type Simulation,
} from "../../services/simulationService";
import { formatDate } from "../../utils/FormatDate";
import { toast } from "react-toastify";
import { type ApiError } from "../../types/ApiError";
import { formatCurrency } from "../../utils/FormatCurrency";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Home() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    count: 0,
    averageInstallmentValue: 0,
  });
  const [chartData, setChartData] = useState<ChartData<"line">>() || null;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSimulations() {
      try {
        const data = await getUserSimulations();

        const sorted = data
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        const lastFive = sorted.slice(0, 5).reverse();

        const count = data.length;
        const averageInstallmentValue =
          data.reduce((acc, cur) => acc + cur.monthlyInstallmentAmount, 0) /
            count || 0;

        const labels = lastFive.map((item) => formatDate(item.createdAt));
        const values = lastFive.map((item) => item.totalAmount);

        setSimulations(lastFive);
        setTotals({
          count,
          averageInstallmentValue: Number(averageInstallmentValue.toFixed(2)),
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Valor da Simulação",
              data: values,
              borderColor: "#00dac0",
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        const err = error as ApiError;
        if (err.status === 401 || err.status === 403) {
          toast.error("Sessão expirada. Por favor, faça o login novamente.");
          sessionStorage.clear();
          navigate("/login");
          return;
        }
        toast.error(err.data?.message ?? "Erro ao carregar seus dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchSimulations();
  }, [navigate, setChartData]);

  const renderSummaryCard = (label: string, value: number | string) => (
    <Card
      elevation={3}
      sx={{
        p: 3,
        flex: 1,
        textAlign: "center",
        borderRadius: 1,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      {loading ? (
        <Skeleton width={80} height={40} sx={{ mx: "auto" }} />
      ) : (
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      )}
    </Card>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mb={4}>
        {renderSummaryCard("Total de Simulações", totals.count)}
        {renderSummaryCard(
          "Valor Médio das Parcelas",
          loading ? "-" : formatCurrency(totals.averageInstallmentValue)
        )}
      </Stack>

      <Card
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 1,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom mb={4}>
          Últimas Simulações
        </Typography>
        <Stack divider={<Divider />} spacing={2}>
          {loading
            ? Array.from(new Array(5)).map((_, i) => (
                <Skeleton key={i} height={40} />
              ))
            : simulations.map((sim) => (
                <Box
                  key={sim.id}
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={{ xs: "column", sm: "row" }}
                  sx={{ fontWeight: 500 }}
                >
                  <Typography>Simulação #{sim.id}</Typography>
                  <Typography>
                    Valor: {formatCurrency(sim.totalAmount)}
                  </Typography>
                  <Typography>Parcelas: {sim.numberOfInstallments}</Typography>
                  <Typography>
                    Parcela: {formatCurrency(sim.monthlyInstallmentAmount)}
                  </Typography>
                </Box>
              ))}
        </Stack>
      </Card>

      <Card
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 1,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Evolução das Simulações (Valor)
        </Typography>
        {loading || !chartData ? (
          <Skeleton height={250} />
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => formatCurrency(Number(value)),
                  },
                },
              },
            }}
            height={250}
          />
        )}
      </Card>
    </Container>
  );
}
