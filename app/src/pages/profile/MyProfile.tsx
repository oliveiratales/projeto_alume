import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Divider,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/FormatDate";

import {
  getUserData,
  updateUserData,
  type UserProfile,
  type UpdateUserData,
} from "../../services/userService";
import EditUserModal from "../../components/profile/EditUserModal";

type ApiError = {
  status?: number;
  data?: {
    message?: string;
  };
};

export default function MyProfile() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserData();
        setUserData(data);
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

    fetchUser();
  }, [navigate]);

  const handleUpdate = async (updatedData: UpdateUserData) => {
    try {
      await updateUserData(updatedData);
      toast.success("Perfil atualizado com sucesso!");
      const freshData = await getUserData();
      setUserData(freshData);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message ?? "Erro ao atualizar perfil.");
      throw error;
    }
  };

  const renderInfo = (label: string, value?: string | null) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="500">
        {loading ? <Skeleton width={160} /> : value || "-"}
      </Typography>
    </Box>
  );

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Card
          elevation={2}
          sx={{ borderRadius: 1, p: 3, position: "relative" }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Meu Perfil
          </Typography>

          {!loading && (
            <IconButton
              onClick={() => setEditOpen(true)}
              sx={{ position: "absolute", top: 16, right: 16 }}
              aria-label="Editar perfil"
            >
              <Edit />
            </IconButton>
          )}

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3}>
            {renderInfo(
              "Nome",
              `${userData?.firstName ?? ""} ${
                userData?.lastName ?? ""
              }`.trim() || "-"
            )}
            {renderInfo("Email", userData?.email)}
            {renderInfo(
              "Último login",
              userData?.lastLogin ? formatDate(userData.lastLogin) : "-"
            )}
            {renderInfo(
              "Criado em",
              userData?.createdAt ? formatDate(userData.createdAt) : "-"
            )}
          </Stack>
        </Card>
      </Container>

      {userData && (
        <EditUserModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          initialData={{
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
          }}
          onSave={async (updatedData) => {
            await handleUpdate(updatedData);
            setEditOpen(false);
          }}
        />
      )}
    </>
  );
}
