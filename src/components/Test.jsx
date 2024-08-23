import { useEffect, useState } from "react";
import api from "../services/api";

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Exemple d'appel GET à votre API
    api
      .get("/hello")
      .then((response) => {
        console.log(response, response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {/* Utilisez les données récupérées ici */}
      {data && (
        <h1>{data}</h1>
        // <ul>
        //   {data.map((item) => (
        //     <li key={item.id}>{item.name}</li>
        //   ))}
        // </ul>
      )}
    </div>
  );
}

export default Test;
