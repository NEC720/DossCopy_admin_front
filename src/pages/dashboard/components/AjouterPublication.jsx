import { Button, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
// import React from 'react'

export default function AjouterPublication() {
    const user = JSON.parse(localStorage.getItem('utilisateur'));

    const queryClient = useQueryClient();

    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    const mutation = useMutation({
      mutationFn: (pub) => {
        return axios.post("http://localhost:3003/publication", pub);
      },
      onError: (error) => {
        toast.error("Une erreur est survenue!")
        console.log(error);
      },
      onSuccess: () => {
        reset();
        toast.success("Publication ajoutée!")
        queryClient.invalidateQueries("publications");

      },
    });

    const onSubmit = (data) => {
        const publication = {
          ...data,
          idUtilisateur: user.id,
          datePublication: new Date(),
          likePublication: 0,
          auteur: user.nomUtilisateur,
        };

        console.log(data);
        console.log(publication);
        console.log(errors);

        mutation.mutate(publication);

        // axios.post("http://localhost:3003/publication", publication).then(
        //     (res) => {
        //         console.log(res.data);
        //         toast.success("Publication ajouté!")
        //         reset();
        //     }
        // ).catch((err) => {
        //     console.log(err);
        //     toast.error("Une erreur est survenue!");
        // });
        
    }

  return (
    <Stack width={"60%"} margin={"auto"}>
      <h1>Ajouter une publication</h1>
      <form
        style={{
          marginTop: 4,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="Vueiller saissir votre publication"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            multiline
            rows={5}
            {...register("textePublication", {
              required: "vueiller saissir votre publication",
              minLength: {
                value: 10,
                message: "Votre publication doit avoir au moins 10 caractères"
              }
            })}
          />

          <TextField
            id="filled-basic"
            label="Vueiller saissir l'url de votre image"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            {...register("imagePublication", {
              required: "vueiller saissir l'url de votre image",
            })}
          />
          <Button variant="contained" type='submit'>Publier</Button>
        </Stack>
      </form>
    </Stack>
  );
}
