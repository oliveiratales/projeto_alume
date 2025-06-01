import { TextField, Box, Link, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import * as yup from "yup";
import AuthForm from "../../components/auth/AuthForm";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha obrigatória"),
});

export default function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await login(data);
      sessionStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Erro ao fazer login.");
    }
  };

  return (
    <AuthForm headerText="Login">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
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
              autoFocus
              autoComplete="email"
              variant="outlined"
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
              autoComplete="current-password"
              variant="outlined"
            />
          )}
        />

        <CustomButton
          type="submit"
          fullWidth
          sx={{ mt: 2, mb: 2, padding: 1 }}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Entrar
        </CustomButton>

        <Typography align="center">
          Não tem uma conta?{" "}
          <Link href="/register" underline="hover" sx={{ cursor: "pointer" }}>
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </AuthForm>
  );
}
