import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/contexts/JwtContext";

export const LoginForm = () => {
  let navigate = useNavigate();
  const { setJwt } = useContext(JwtContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    API.post("users/login", formData).then((response)=>{
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user",  JSON.stringify( response.data.userData));  
       
     
        setJwt(response.data)
        navigate("/");
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        {...register("password", {
          required: true,
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
        })}
      />
      <button>Login</button>
    </form>
  );
};
