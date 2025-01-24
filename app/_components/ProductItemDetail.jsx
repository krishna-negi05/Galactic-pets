"use client";
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { UpdateCart } from '../_context/UpdateCart';

function ProductItemDetail({ product }) {
  const jwt = localStorage.getItem('jwt');  // Fixed the typo here
  const [Quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { updateCart, setUpdateCart } = useContext(UpdateCart);
  const user = JSON.parse(localStorage.getItem('user'));
  const productTotalPrice = product.sellingprice ? product.sellingprice : product.mrp;

  // Redirect to sign-in if not logged in or if user data is missing
  if (!jwt || !user) {
    router.push('/sign-in');
    return null;
  }

  const addToCart = () => {
    if (!jwt || !user) {
      router.push('/sign-in');
      return;
    }

    const data = {
      data: {
        quantity: Quantity,
        amount: (Quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id,
      },
    };

    const toastId = toast.loading('Adding to Cart...'); // Show loading message

    GlobalApi.addToCart(data, jwt)
      .then((resp) => {
        console.log(resp);
        setUpdateCart(!updateCart);
        toast.success('Added to Cart', { id: toastId }); // Update the loading toast to success
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error?.message || 'Error while adding to cart';
        console.log(error.response?.data || error);
        toast.error(errorMessage, { id: toastId }); // Update the loading toast to error
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-shrink-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0]?.formats?.large?.url || '/default-image.jpg'}`}
          alt="image"
          width={300}
          height={300}
          className="rounded-lg w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] object-contain"
        />
      </div>

      <div className="flex flex-col justify-center gap-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{product.Name}</h2>
        <p className="text-sm sm:text-base text-gray-600">{product.description}</p>
        
        <div className="flex items-center gap-2">
          {product.sellingprice && <h2 className="text-green-600 text-3xl font-bold">₹ {product.sellingprice}</h2>}
          <h2 className={`text-gray-500 text-3xl ${product.sellingprice && 'line-through'}`}>{product.mrp}</h2>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="font-medium text-md">Quantity:</h2>
          <div className="flex items-center gap-2">
            <button
              disabled={Quantity === 1}
              onClick={() => setQuantity(Quantity - 1)}
              className="px-2 py-1 border rounded-md"
            >
              -
            </button>
            <h2 className="px-2">{Quantity}</h2>
            <button
              onClick={() => setQuantity(Quantity + 1)}
              className="px-2 py-1 border rounded-md"
            >
              +
            </button>
          </div>
          <h2 className='text-md font-bold'>=</h2>
          <h2 className="text-green-600 text-3xl font-bold"> ₹ {Quantity * productTotalPrice}</h2>
        </div>

        <Button className="flex gap-3 items-center" onClick={addToCart}>
          <ShoppingCart />
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductItemDetail;
