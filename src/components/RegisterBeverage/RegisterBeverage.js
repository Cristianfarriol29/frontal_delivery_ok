import React from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const RegisterBeverage = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  let userToken = localStorage.getItem("token");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("price", Number(data.price));
    formData.append("name", data.name);
    console.log(formData);

    API.post(`/products/beverages/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      console.log(response);

      if (response.status === 201) {
        Swal.fire(
          "Correcto",
          "El producto se creó correctamente en la base de datos.",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema a la hora de crear el producto.",
        });
      }
      /* Swal.fire(
        "Correcto",
        "El producto se agregó correctamente",
        "success"
      ),
Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes seleccionar la cantidad y el tamaño de las pizzas!",
    }) */
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre de la nueva bebida:</label>
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
      <input
        type="file"
        name="img"
        id="img"
        {...register("img", { required: true })}
      />

      <label>Descripción:</label>
      <input
        type="text"
        name="description"
        {...register("description", { required: false })}
      />

      <button>Register</button>
    </form>
  );
};
