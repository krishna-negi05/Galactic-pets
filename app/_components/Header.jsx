"use client";
import { Button } from '@/components/ui/button';
import { CircleUserRoundIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from '../_utils/GlobalApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { UpdateCart } from "../_context/UpdateCart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from './CartItemList';

function Header() {
  const [CategoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCart);
  const [isAccountCreated, setIsAccountCreated] = useState(false); // State for checking if the user has created an account
  const router = useRouter();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const userCreated = localStorage.getItem('userCreated'); 
    setIsLogin(!!jwt);
    setIsAccountCreated(!!userCreated); 
  }, []);

  const onSignOut = () => {
    localStorage.clear();
    router.push('/sign-in');
  };

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (jwt && user) {
      getCartItems(user.id, jwt);
    }
  }, [updateCart]); 
  const getCartItems = async (userId, jwt) => {
    try {
      const cartItemList_ = await GlobalApi.getCartItems(userId, jwt);
      console.log(cartItemList_);
      setTotalCartItem(cartItemList_?.length); // Update total cart item count
      setCartItemList(cartItemList_); // Update the cart item list
    } catch (error) {
      console.error('Error fetching cart items:', error); // Add error handling
    }
  };
  
  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8'>
        <Image src='/logo.png' alt='logo' width={80} height={50} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className='md:flex flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hidden cursor-pointer'>
              <LayoutGrid /> Filters
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CategoryList.map((category, index) => (
              <DropdownMenuItem key={index} className='flex gap-4 items-center cursor-pointer'>
                {category?.Icon?.map((icon, iconIndex) => (
                  <Image
                    key={iconIndex}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${icon?.url}`}
                    unoptimized={true}
                    width={30}
                    height={30}
                    alt={`icon-${iconIndex}`}
                  />
                ))}
                <h2 className='text-lg'>{category?.Name}</h2>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='md:flex flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
          <Search />
          <input
            type='text'
            placeholder='Search'
            className='outline-none'
          />
        </div>
      </div>
      
      <div className='flex gap-5 items-center'>
        <Sheet>
          <SheetTrigger>
            <h2 className='flex gap-1 items-center text-lg'>
              <ShoppingBag />
              <span className='bg-yellow-500 text-white px-2 rounded-full'>
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='bg-blue-300 font-bold text-lg text-white p-2'>My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={'/sign-in'}>
            <Button>Login</Button>
          </Link>
        ) : (
          // Show the CircleUserRoundIcon when user is logged in
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRoundIcon className='h-12 w-12 bg-purple-200 p-2 cursor-pointer rounded-full'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
