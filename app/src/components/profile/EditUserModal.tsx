import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Fade,
  Backdrop,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../common/CustomButton";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => Promise<void>;
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const schema = yup.object({
  firstName: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

export default function EditUserModal({
  open,
  onClose,
  onSave,
  initialData,
}: EditUserModalProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (open) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
      maxWidth="xs"
      fullWidth
    >
      <Fade in={open} timeout={500}>
        <Box>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={isSubmitting}
                    autoFocus
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Sobrenome"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={isSubmitting}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <CustomButton
              type="submit"
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitting}
            >
              Salvar
            </CustomButton>
          </DialogActions>
        </Box>
      </Fade>
    </Dialog>
  );
}
