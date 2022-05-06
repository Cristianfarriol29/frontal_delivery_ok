import React from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";

export const RegisterDessert = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  let userToken = localStorage.getItem("token");

  const onSubmit = (formData) => {
    API.post(`/products/desserts/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre del nuevo postre:</label>
      <input
        type="text"
        name="name"
        {...register("name", { required: true })}
      />

      <label>Precio:</label>
      <input
        type="number"
        name="price"
        {...register("price", { required: true })}
      />
      <label>Imagen:</label>
      <input type="url" name="img" {...register("img", { required: true })} />

      <label>Descripción:</label>
      <input
        type="text"
        name="description"
        {...register("description", { required: false })}
      />

      <label>Alérgenos:</label>
      <input
        type="array"
        name="allergic"
        {...register("allergic", { required: false })}
      />

      <button>Register</button>
    </form>
  );
};
