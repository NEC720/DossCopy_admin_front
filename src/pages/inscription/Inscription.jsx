import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import api from "../../services/api";

function Inscription() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password === data.password_confirmation) {
      api
        .post("/auth/register", data)
        .then((resp) => {
          if (resp.data.status === "success") {
            toast.success(resp.data.message);
            navigate("/inscription/verification-email", {
              state: { responseData: resp.data },
            });
          } else {
            toast.error("Cette adresse mail est déjà utilisée!");
          }
        })
        .catch(() => {
          toast.error("Erreur d'inscription !");
        });
    } else {
      toast.error("Les mots de passe ne correspondent pas !");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8001/redirect/${provider}`;
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width={"100%"}
      height={"100vh"}
      sx={{ background: "linear-gradient(135deg, #e09, #ffeb3b)" }} // Identique au composant de connexion
    >
      <Box
        width={400}
        // height={"100vh"}
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          height: "70%",
        }}
      >
        <Typography
          variant="h4"
          marginBottom={2}
          fontWeight="bold"
          color="primary"
        >
          Inscription
        </Typography>
        <Typography variant="body2" color="textSecondary" marginBottom={3}>
          Créez un compte pour accéder à nos services
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Nom complet"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              {...register("name", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 3,
                  message: "Veuillez saisir un nom d'au moins 3 caractères",
                },
              })}
            />
            <TextField
              label="Adresse email"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: "Veuillez saisir votre adresse email",
                pattern: {
                  value: /^[a-z0-9]+@[a-z0-9]+(\.[a-z]{2,})+$/,
                  message: "Veuillez saisir une adresse email valide",
                },
              })}
            />
            <TextField
              label="Mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              {...register("password", {
                required: "Veuillez saisir un mot de passe",
                minLength: { value: 8, message: "Au moins 8 caractères" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Le mot de passe doit contenir une majuscule, une minuscule, et un chiffre",
                },
              })}
            />
            <TextField
              label="Confirmer le mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              error={!!errors.password_confirmation}
              helperText={
                errors.password_confirmation
                  ? errors.password_confirmation.message
                  : ""
              }
              {...register("password_confirmation", {
                required: "Veuillez confirmer votre mot de passe",
              })}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 3,
              padding: 1.5,
              fontSize: "16px",
              backgroundColor: "#e09",
              "&:hover": {
                backgroundColor: "#d4087d",
              },
            }}
            type="submit"
            fullWidth
          >
            S&apos;inscrire
          </Button>
        </form>

        <Divider sx={{ marginY: 3 }}>ou</Divider>

        {/* Section des providers OAuth */}
        <Stack
          direction="row"
          spacing={1}
          marginTop={3}
          justifyContent="center"
        >
          <IconButton onClick={() => handleOAuthLogin("google")}>
            <GoogleIcon sx={{ color: "#DB4437", fontSize: 30 }} />
          </IconButton>
          <IconButton onClick={() => handleOAuthLogin("github")}>
            <GitHubIcon sx={{ color: "#333", fontSize: 30 }} />
          </IconButton>
          <IconButton onClick={() => handleOAuthLogin("linkedin")}>
            <LinkedInIcon sx={{ color: "#0A66C2", fontSize: 30 }} />
          </IconButton>
        </Stack>

        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 3 }}>
          Déjà un compte?{" "}
          <Button
            variant="text"
            color="primary"
            style={{ color: "#e09", fontWeight: "bold" }}
            onClick={() => navigate("/connexion")}
          >
            Connexion
          </Button>
        </Typography>
      </Box>
    </Stack>
  );
}

export default Inscription;
