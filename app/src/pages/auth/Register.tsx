import { TextField, Box, Link, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthForm from "../../components/auth/AuthForm";
import CustomButton from "../../components/common/CustomButton";

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterPayload = Omit<RegisterFormInputs, "confirmPassword">;

const schema = yup.object({
  firstName: yup.string().required("Nome obrigatório"),
  lastName: yup.string().required("Sobrenome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem coincidir")
    .required("Confirmação de senha obrigatória"),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const payload: RegisterPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      await register(payload);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Erro ao registrar");
    }
  };

  return (
    <AuthForm headerText="Crie sua conta na Alume">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Nome"
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              autoFocus
              variant="outlined"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Sobrenome"
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              autoFocus
              variant="outlined"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              autoComplete="email"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Senha"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              type="password"
              variant="outlined"
              autoComplete="new-password"
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirmar Senha"
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              type="password"
              variant="outlined"
              autoComplete="new-password"
            />
          )}
        />

        <CustomButton
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Registrar
        </CustomButton>

        <Typography align="center">
          Já tem uma conta?{" "}
          <Link href="/login" underline="hover" sx={{ cursor: "pointer" }}>
            Entrar
          </Link>
        </Typography>
      </Box>
    </AuthForm>
  );
}
