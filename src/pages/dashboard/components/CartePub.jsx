import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import React from 'react'

export default function CartePub({publication}) {
    const user = JSON.parse(localStorage.getItem('utilisateur'));
    console.log(user);
    const queryClientDeleting = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:3003/publication/${id}`);
            
        },
        onSuccess: () => {
            toast.success("Publication supprimée avec succès!");
            queryClientDeleting.invalidateQueries(['publication'])
        }, 
        onError: (error) => {
            toast.error("Une erreur est survenue lors de la suppression de la publication.");
            console.log(error);
        },
        // updateQuery: (previousResult, { data: newPublication }) => {
    });

    const supprimerPublication = (id) => () => {
        deleteMutation.mutate(id);
    };

    /*const supprimerPublication = (id) => () => {
        axios.delete(`http://localhost:3003/publication/${id}`)
       .then(() => {
        toast.success("Publication supprimée avec succès!");

       } )
       .catch((error) => {
        toast.error("Une erreur est survenue lors de la suppression de la publication.");
        console.log(error);
        });
    };*/

  return (
    <Box
      width={"100%"}
      bgcolor={"#fff"}
      borderRadius={4}
      marginBottom={3}
      padding={2}
    >
      <Stack
        direction={"reverse"}
        alignItems={"center"}
        justifyContent={""}
        gap={2}
      >
        <Avatar src={"publication.photoUtilisateur"} />
        <Typography>{publication.auteur}</Typography>
        {user.id === publication.idUtilisateur && (
          <IconButton
            aria-label="delete"
            onClick={supprimerPublication(publication.id)}
            sx={{ marginRight: 0, marginLeft: "auto" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Typography> {publication.textePublication} </Typography>
      <img src={publication.imagePublication} width={"100%"} height={340} />
    </Box>
  );
}

CartePub.propTypes = {
    publication: PropTypes.shape(
        {
            id: PropTypes.number.isRequired,
            auteur: PropTypes.string.isRequired,
            imagePublication: PropTypes.string.isRequired,
            photoUtilisateur: PropTypes.string.isRequired,
            textePublication: PropTypes.string.isRequired,
            idUtilisateur: PropTypes.number.isRequired,
        }
    ).isRequired, // Ce isRequired est facultatif lorsqu'on le precise pour chaque propreté; sinon il est obligatoire!
};