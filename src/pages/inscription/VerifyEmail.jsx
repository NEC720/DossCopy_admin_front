import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const encodedUrl = searchParams.get("url");

    if (encodedUrl) {
      let url = decodeURIComponent(encodedUrl);

      if (url.includes(":8001/")) {
        url = url.replace(":8001/", ":8001/api/");
      } else {
        url = url.replace(":8000/", ":8001/api/");
      }

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          
          setMessage("Votre email a été vérifié avec succès!");
          setSuccess(true);
          setTimeout(() => navigate("/"), 3000);
        })
        .catch((error) => {
          console.log(error);
          
          setMessage("La vérification de votre email a échoué.");
          setSuccess(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams, navigate]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Vérification d&apos;Email
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box mt={4}>
          {success ? (
            <>
              <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h6" color="success.main" gutterBottom>
                {message}
              </Typography>
            </>
          ) : (
            <>
              <ErrorIcon color="error" sx={{ fontSize: 60 }} />
              <Typography variant="h6" color="error.main" gutterBottom>
                {message}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/inscription")}
                sx={{ mt: 2 }}
              >
                Réessayer
              </Button>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default VerifyEmail;
