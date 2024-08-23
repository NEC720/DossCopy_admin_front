// import React from 'react'

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/Facebook";

function Connexion() {
  const navigation = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("utilisateur")!== null) {
      navigation("/");
    }
  });

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
      // A remplacer par l'appel à l'API
      api
        .post("/auth/login", data)
        .then((res) => {
          // console.log(res, res.data, res.data.user, res.data.authorisation.token);
          if (res.data.user) {
            const user = res.data.user;
            const { token, type } = res.data.authorisation;

            const utilisateur = {
              name: user.name,
              email: user.email,
              // ...user,
              token,
              type,
            };
            console.log(utilisateur);
            // Sauvegarder l'utilisateur dans le local storage
            localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
            toast.success("Connexion réussie !");
            navigation("/");
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
          Connexion
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{}}>
          <Stack direction={"column"} gap={2}>
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
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, //(?=.*[@$!%*?&.]) [... @$!%*?&.]
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
            Connecter
          </Button>
          <Typography marginTop={2}>
            Vous n&apos;avez pas de compte? {"  "}
            <Link to="/inscription">S&apos;inscrire</Link>
          </Typography>

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

export default Connexion;
