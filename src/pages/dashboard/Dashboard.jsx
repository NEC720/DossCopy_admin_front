import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../services/api";
import UsersTable from "./components/UsersTable";
import CybersTable from "./components/CybersTable";

function Dashboard() {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (localStorage.getItem("utilisateur")) {
        try {
          const user = JSON.parse(localStorage.getItem("utilisateur"));
          console.log("user", user);

          const response = await api.post("/auth/verifytoken", user);
          console.log(response, response.data, response.data.valid);

          if (!response.data.valid) {
            toast.error("Token invalide. Vous devez vous reconnecter.");
            localStorage.removeItem("utilisateur");
            navigate("/connexion");
          } else {
            setIsTokenValid(true);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("utilisateur");
          navigate("/connexion");
        }
      } else {
        navigate("/connexion");
      }
    };

    verifyToken();
  }, [navigate]);

  const {
    data: dataDashboard,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["dataDashboard"],
    queryFn: () => api.get("api/dashboard").then((res) => res.data),
    enabled: isTokenValid, // Exécute la requête seulement si le token est valide
    onError: (error) => console.log(error),
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    console.error("Erreur lors de la récupération des datas : ", error);
    toast.error("Erreur lors de la récupération des datas");
  }

  const cybers = dataDashboard?.data?.cybers || [];
  const users = dataDashboard?.data?.users || [];

  console.log("Cybers:", cybers[0]?.original);
  console.log("Users:", users[0]?.original);

  return (
    <Box bgcolor={"#eef4ff"}>
      <NavBar />
      <Box marginTop={5} textAlign={"center"}>
        <h1>Bienvenue sur DossCopy!</h1>
        <br />
        <h3>Voici vos données du dashboard:</h3>
        <h4>Table des Utilisateurs:</h4>
        <UsersTable users={users[0]?.original || []} />
        <br />
        <h4>Table des cybers:</h4>
        <CybersTable cybers={cybers[0]?.original || []} />
      </Box>
    </Box>
  );
}

export default Dashboard;
