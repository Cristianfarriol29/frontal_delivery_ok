import React from "react";
import CheckOut from "../../shared/components/CheckOut/CheckOut";
import { useCartContext } from "../../shared/contexts/CartContext";
import Swal from "sweetalert2";
import "./_CartPage.scss";

const CartPage = () => {
  const { cartItems, deleteItems, restarItems, sumarItems } = useCartContext();

  //ElEMENTOS QUE PASAMOS A CHECKOUT
  let totalAPagar = cartItems.reduce((a, c) => a + c.subtotal, 0);
  let products = cartItems.map((product) => product.name);

  const confirmarProductoAEliminar = (producto) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este producto?",
      text: "Recuerda que si lo eliminas, no podrás recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar
        deleteItems(producto);
      }
    });
  };

  return (
    <div className="cart container">
      {cartItems.length === 0 && (
        <h1>Aun no tienes productos en el carrito de compras</h1>
      )}

      {cartItems.map((productosDelCarrito) => {
        return (
          <div className="cart_items">
            <div className="cart_items-image">
              <h1>{productosDelCarrito.name}</h1>
              <img
                src={productosDelCarrito.img}
                alt=""
                width={550}
                height={450}
              />
            </div>
            <div className="cart_items-info">
              <p>Cantidad: {productosDelCarrito.cant}</p>
              <p>Precio: {productosDelCarrito.price}</p>
              <p>Subtotal: {parseInt(productosDelCarrito.subtotal)} €</p>
            </div>
            <button
              onClick={() => confirmarProductoAEliminar(productosDelCarrito)}
            >
              Eliminar producto
            </button>
            <button
              onClick={() =>
                productosDelCarrito.cant > 1
                  ? restarItems(productosDelCarrito)
                  : confirmarProductoAEliminar(productosDelCarrito)
              }
            >
              RESTAR
            </button>
            <button onClick={() => sumarItems(productosDelCarrito)}>
              SUMAR
            </button>
          </div>
        );
      })}

      {cartItems.length !== 0 && (
        <CheckOut subtotal={totalAPagar} cartProducts={products} />
      )}
    </div>
  );
};

export default CartPage;
