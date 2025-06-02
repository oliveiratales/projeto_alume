import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { object, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createSimulation } from "../../services/simulationService";
import { useNavigate } from "react-router-dom";
import { type ApiError } from "../../types/ApiError";
import CustomButton from "../../components/common/CustomButton";

const schema = object({
  totalAmount: number()
    .typeError("Informe um número válido")
    .required("Informe o valor total")
    .positive("Valor deve ser maior que zero"),
  monthlyInterestRate: number()
    .typeError("Informe um número válido")
    .required("Informe a taxa de juros")
    .min(0, "Taxa de juros deve ser maior ou igual a 0%")
    .max(100, "Taxa de juros deve ser menor ou igual a 100%"),
  numberOfInstallments: number()
    .typeError("Informe um número válido")
    .required("Informe a quantidade de parcelas")
    .integer("Quantidade de parcelas deve ser um número inteiro")
    .min(1, "Quantidade mínima de parcelas é 1")
    .max(360, "Quantidade máxima de parcelas é 360"),
});

type FormData = {
  totalAmount: number;
  numberOfInstallments: number;
  monthlyInterestRate: number;
};

export default function CreateSimulation() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      totalAmount: 0,
      numberOfInstallments: 1,
      monthlyInterestRate: 0.15,
    },
  });

  const [monthlyInstallmentAmount, setMonthlyInstallmentAmount] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  const totalAmount = watch("totalAmount");
  const numberOfInstallments = watch("numberOfInstallments");
  const monthlyInterestRate = watch("monthlyInterestRate");

  useEffect(() => {
    const pv = Number(totalAmount);
    const i = Number(monthlyInterestRate) / 100;
    const n = Number(numberOfInstallments);

    if (pv > 0 && i >= 0 && n > 0) {
      const denominator = 1 - Math.pow(1 + i, -n);
      if (denominator === 0) {
        setMonthlyInstallmentAmount(null);
        return;
      }
      const pmt = pv * (i / denominator);
      setMonthlyInstallmentAmount(isNaN(pmt) || !isFinite(pmt) ? null : pmt);
    } else {
      setMonthlyInstallmentAmount(null);
    }
  }, [totalAmount, monthlyInterestRate, numberOfInstallments]);

  async function onSubmit(data: FormData) {
    try {
      const payload = {
        ...data,
        monthlyInstallmentAmount: monthlyInstallmentAmount || 0,
      };
      await createSimulation(payload);
      toast.success("Simulação salva com sucesso!");
      reset();
    } catch (error) {
      const err = error as ApiError;
      if (err.status === 401 || err.status === 403) {
        toast.error("Sessão expirada. Por favor, faça o login novamente.");
        sessionStorage.clear();
        navigate("/login");
        return;
      }
      toast.error(err.data?.message ?? "Erro ao registrar sua simulação.");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Nova simulação
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Controller
              name="totalAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Valor Total (R$)"
                  fullWidth
                  size="medium"
                  error={!!errors.totalAmount}
                  helperText={errors.totalAmount?.message}
                  inputProps={{ step: "0.01", min: "0" }}
                />
              )}
            />

            <Controller
              name="monthlyInterestRate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Taxa de Juros (%) mensal"
                  fullWidth
                  size="medium"
                  error={!!errors.monthlyInterestRate}
                  helperText={errors.monthlyInterestRate?.message}
                  inputProps={{ step: "0.01", min: "0", max: "100" }}
                />
              )}
            />

            <Controller
              name="numberOfInstallments"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Quantidade de Parcelas"
                  fullWidth
                  size="medium"
                  error={!!errors.numberOfInstallments}
                  helperText={errors.numberOfInstallments?.message}
                  inputProps={{ step: "1", min: "1", max: "360" }}
                />
              )}
            />

            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                Valor da Parcela:
              </Typography>
              <Typography variant="h6" color="primary">
                {monthlyInstallmentAmount !== null
                  ? monthlyInstallmentAmount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "-"}
              </Typography>
            </Box>

            <CustomButton
              type="submit"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Simular
            </CustomButton>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
