// app/_components/CartProvider.js
"use client"; // Mark this as a client component

import { useState } from "react";
import { UpdateCart } from "../_context/UpdateCart";

function CartProvider({ children }) {
  const [updateCart, setUpdateCart] = useState(false); // Manage the cart state

  return (
    <UpdateCart.Provider value={{ updateCart, setUpdateCart }}>
      {children}
    </UpdateCart.Provider>
  );
}

export default CartProvider;
