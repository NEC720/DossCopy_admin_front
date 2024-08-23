// import React from 'react'

import { Box, Button, Stack, TextField, Typography } from "@mui/material"
// import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/Facebook";

function Inscription() {
  const navigation = useNavigate();

  const {register, handleSubmit, formState:{ errors },} = useForm();

  const onSubmit = (data) => {
    if (data.password == data.password_confirmation) {
      api
        .post("/auth/register", data)
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status === "success") {
            toast.success(resp.data.message);
            navigation("/connexion");
          } else {
            toast.error("Cette adresse mail est déjà utilisée!");
          }

        })
        .catch((err) => {
          console.log(err);
          toast.error("Erreur d'inscription !");
        });

    } else {
      console.log(data, errors);
      toast.error("Les mots de passes ne correspondent pas !");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8001/redirect/${provider}`; // Remplacez localhost:8000 par l'URL de votre serveur Laravel
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      bgcolor={"#f5f5f5"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" marginBottom={2}>
          Inscription
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{}}>
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-nom"
              label="Veillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
              {...register("name", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 3,
                  message: "Veuillez saisir un nom de 3 caractères",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre adresse mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
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
              id="filled-password"
              label="Veillez entrez votre not de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("password", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 8,
                  message: "Au moins 8 caractères",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                  message:
                    "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
                },
              })}
            />
            <TextField
              id="filled-confPWD"
              label="Confirmer votre not de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("password_confirmation", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 8,
                  message: "Au moins 8 caractères",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                  message:
                    "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
                },
              })}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
          >
            Inscription
          </Button>

          <Stack direction="column" spacing={2} marginTop={2}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleOAuthLogin("google")}
            >
              Se connecter avec Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={() => handleOAuthLogin("github")}
            >
              Se connecter avec GitHub
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              onClick={() => handleOAuthLogin("linkedin")}
            >
              Se connecter avec LinkedIn
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}

export default Inscription