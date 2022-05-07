import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ButtonLogout } from "../../shared/components/ButtonLogOut/ButtonLogOut";
import { useCartContext } from "../../shared/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/contexts/JwtContext";

export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/orders");
  };

  let navigate = useNavigate();
  const { setJwt } = useContext(JwtContext);
  const { setCartItems } = useCartContext();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem('carrito');
    setCartItems([]);

    setJwt(null);
    navigate("/login");
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Mis Pedidos</MenuItem>
        <MenuItem onClick={logOut}>LogOut</MenuItem>
      </Menu>
    </div>
  );
}
