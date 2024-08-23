import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Récupérer les informations de l'utilisateur depuis l'API avec le token
      api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
            console.log(res.data);

          // Sauvegarder l'utilisateur dans le local storage et rediriger vers la page d'accueil
          const user = res.data;
          const utilisateur = {
            name: user.name,
            email: user.email,
            token,
            type: "Bearer",
          };

          localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
          toast.success("Connexion réussie !");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erreur lors de la récupération des informations !");
          navigate("/connexion");
        });
    } else {
      toast.error("Token non fourni !");
      navigate("/connexion");
    }
  }, [navigate]);

  return null;
}

export default OAuthCallback;
