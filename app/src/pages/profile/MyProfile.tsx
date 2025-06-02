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
import { type ApiError } from "../../types/ApiError";

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
      if (err.status === 401 || err.status === 403) {
        toast.error("Sessão expirada. Por favor, faça o login novamente.");
        sessionStorage.clear();
        navigate("/login");
        return;
      }

      toast.error(err.data?.message ?? "Erro ao carregar seus dados.");
    }
  };

  const renderInfo = (label: string, value?: string | null) => (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {loading ? <Skeleton width={160} /> : value || "-"}
      </Typography>
    </Box>
  );

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Card
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 1,
            position: "relative",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Meu Perfil
          </Typography>

          {!loading && (
            <IconButton
              onClick={() => setEditOpen(true)}
              sx={{ position: "absolute", top: 24, right: 24 }}
              aria-label="Editar perfil"
            >
              <Edit />
            </IconButton>
          )}

          <Divider sx={{ my: 2 }} />

          <Stack spacing={3}>
            {renderInfo(
              "Nome completo",
              `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim()
            )}
            <Divider />
            {renderInfo("Email", userData?.email)}
            <Divider />
            {renderInfo(
              "Último login",
              userData?.lastLogin ? formatDate(userData.lastLogin) : "-"
            )}
            <Divider />
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
