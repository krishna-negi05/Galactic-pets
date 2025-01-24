import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ cartItemList }) {
  const [subtotal,setSubTotal]=useState(0);
  useEffect(()=>{
    let total=0;
    cartItemList.forEach(element => {
      total=total+element.amount
    });
    setSubTotal(total)
  },[cartItemList])
  return (
    <div className="bg-white rounded shadow-md p-4">
      {/* Scrollable Cart Items Section */}
      <div className="max-h-[70vh] overflow-y-auto">
        {cartItemList.length > 0 ? (
          cartItemList.map((cart, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-6 p-3 border-b border-gray-200 hover:bg-gray-100 transition-all"
            >
              {/* Item Image */}
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
                unoptimized={true}
                className="rounded"
              />

              {/* Item Details */}
              <div className="flex-1">
                <h2 className="font-bold text-lg">{cart.name}</h2>
                <p className="text-gray-600">Qty: {cart.quantity}</p>
                <p className="text-lg font-bold text-green-600">
                  ₹ {cart.amount}
                </p>
              </div>

              {/* Trash Icon */}
              <TrashIcon className="cursor-pointer hover:text-red-600 transition-all" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items in the cart</p>
        )}
      </div>

      {/* Static Subtotal and Button Section */}
      <div className="mt-4 border-t border-gray-300 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Subtotal:</h2>
          <span className="text-lg font-bold text-green-600">₹ {subtotal}</span>
        </div>
        <Button className="w-full">View Cart</Button>
      </div>
    </div>
  );
}

export default CartItemList;
