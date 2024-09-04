import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/Facebook";

import api from "../../services/api";

function Connexion() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("utilisateur")) {
      navigate("/");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api
      .post("/auth/login", data)
      .then((res) => {
        if (res.data.user) {
          const user = res.data.user;
          const { token, type } = res.data.authorisation;

          const utilisateur = {
            name: user.name,
            email: user.email,
            token,
            type,
          };
          localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
          toast.success("Connexion réussie !");
          navigate("/");
        } else {
          toast.error("Ce compte n'existe pas");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la connexion !");
      });
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8001/redirect/${provider}`;
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      sx={{ background: "linear-gradient(135deg, #e09, #ffeb3b)" }}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          marginBottom={3}
        >
          Connexion
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{}}>
          <Stack direction={"column"} gap={3}>
            <TextField
              id="email"
              label="Adresse mail"
              variant="outlined"
              fullWidth
              size="medium"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Veuillez saisir votre adresse mail",
                minLength: {
                  value: 8,
                  message: "Veuillez saisir un adresse mail valide",
                },
                pattern: {
                  value: /^[a-z0-9]+@[a-z0-9]+(\.[a-z]{2,})+$/,
                  message: "exemple@gmail.com",
                },
              })}
            />
            <TextField
              id="password"
              label="Mot de passe"
              variant="outlined"
              fullWidth
              size="medium"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 8,
                  message: "Au moins 8 caractères",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre.",
                },
              })}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 3,
              padding: "12px 0",
              fontSize: "16px",
              fontWeight: 600,
              backgroundColor: "#e09",
              "&:hover": {
                backgroundColor: "#d4087d",
              },
            }}
            type="submit"
            fullWidth
          >
            Connexion
          </Button>
          <Typography
            marginTop={2}
            fontSize={"0.9rem"}
            color={"text.secondary"}
          >
            Vous n&apos;avez pas de compte ?{" "}
            <Link
              to="/inscription"
              style={{ color: "#e09", fontWeight: "bold" }}
            >
              S&apos;inscrire
            </Link>
          </Typography>

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
        </form>
      </Box>
    </Stack>
  );
}

export default Connexion;
