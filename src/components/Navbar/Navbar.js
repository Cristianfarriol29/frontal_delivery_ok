import React from "react";
import { NavLink } from "react-router-dom";
import { ButtonLogout } from "../../shared/components/ButtonLogOut/ButtonLogOut";
import { useCartContext } from "../../shared/contexts/CartContext";
import ProfileButton from "../ProfileButton/ProfileButton";
import "./_Navbar.scss";

const Navbar = ({ jwt }) => {
  const { cartItems } = useCartContext();
  const cant = cartItems.reduce((acc, prod) => acc + prod.cant, 0);

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      {jwt && (
        <div className="navbar_logo">
          <NavLink to="">
            <img
              src="https://static4.depositphotos.com/1007168/269/i/450/depositphotos_2699600-stock-photo-cartoon-logo-proud-chef-holds.jpg"
              alt="Pizzeria Logo - Logo De Una Pizzeria@clipartmax.com"
              height={150}
              width={200}
            />
          </NavLink>
        </div>
      )}

      {!jwt && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
      <div className="navbar_links">
        {jwt && user !== null && user.role !== "admin" && (
          <NavLink to="/cart">
            <div className="navbar_links-cart">
              <img
                height={60}
                width={60}
                src="https://cdn.icon-icons.com/icons2/1709/PNG/512/shoppingcart_112424.png"
              />
            </div>

            <div className="navbar_links-cart_cant">
              <h2>{cant}</h2>
            </div>
          </NavLink>
        )}
        {jwt && user !== null && user.role === "admin" && (
          <NavLink to="/admin">
            <button>Panel de administrador</button>
          </NavLink>
        )}

        {jwt && <ProfileButton />}
      </div>
    </nav>
  );
};

export default Navbar;
