import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Remplacez par l'URL de votre API Laravel

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // Ajoutez des headers d'authentification ou d'autres headers nécessaires ici
    // Exemple: config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'; // Pour utiliser CSRF protection Laravel
    // config.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Pour utiliser CSRF protection Laravel
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'; // Pour utiliser CORS protection Laravel

  },
});

/** Le resonnement par l'absurde est appliqué au endpoints specifiques **/

// Liste des endpoints spécifiques qui nécessitent un token
const protectedEndpoints = [
  "/login",
  "/register",
  // Ajoutez ici d'autres endpoints qui nécessitent un token
];

// Intercepteur pour ajouter le token Bearer à certaines requêtes
api.interceptors.request.use(config => {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  
  if (utilisateur && utilisateur.token && !protectedEndpoints.some(endpoint => config.url.includes(endpoint))) {
    config.headers.Authorization = `Bearer ${utilisateur.token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
