import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import CustomButton from "../common/CustomButton";

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserFormProps {
  initialData: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function UserForm({
  initialData,
  onSubmit,
  onSuccess,
  onError,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>(initialData);
  const [saving, setSaving] = useState(false);

  const handleChange =
    (field: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSubmit(formData);
      if (onSuccess) onSuccess();
    } catch {
      if (onError) onError("Erro ao salvar dados.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <TextField
        label="Nome"
        value={formData.firstName}
        onChange={handleChange("firstName")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Sobrenome"
        value={formData.lastName}
        onChange={handleChange("lastName")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={handleChange("email")}
        type="email"
        fullWidth
        margin="normal"
      />

      <CustomButton
        onClick={handleSubmit}
        loading={saving}
        fullWidth
        sx={{ mt: 2 }}
      >
        Salvar alterações
      </CustomButton>
    </Box>
  );
}
