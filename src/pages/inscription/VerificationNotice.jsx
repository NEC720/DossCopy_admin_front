import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const VerificationNotice = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { responseData } = location.state || {}; // Accéder aux données passées via l'état
  console.log(responseData, responseData.user.id);
  

  const handleResendVerificationEmail = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8001/api/email/resend", {
        id: responseData.user.id,
      });
      toast.success("Email de vérification renvoyé!");
    } catch (error) {
      toast.error("Erreur lors de l'envoi de l'email de vérification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f9fafc"
      px={3}
    >
      <Stack
        direction="column"
        spacing={3}
        alignItems="center"
        maxWidth={500}
        bgcolor="#ffffff"
        boxShadow={3}
        borderRadius={3}
        padding={4}
        textAlign="center"
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />
        <Typography variant="h5" fontWeight="bold">
          Vérification d&apos;Email Requise
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Veuillez vérifier votre adresse email pour activer votre compte. Un
          email de vérification a été envoyé à{" "}
          <strong>{responseData?.user?.email}</strong>.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResendVerificationEmail}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} /> : <MailOutlineIcon />
          }
          sx={{ width: "100%" }}
        >
          Renvoyer l&apos;email de vérification
        </Button>
        <Typography variant="caption" color="textSecondary">
          Si vous n&apos;avez pas reçu l&apos;email, veuillez vérifier votre
          dossier spam.
        </Typography>
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate("/connexion")}
          sx={{ mt: 2 }}
        >
          Retour à la connexion
        </Button>
      </Stack>
    </Box>
  );
};

export default VerificationNotice;
