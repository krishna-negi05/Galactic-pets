import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      {/* Image Section */}
      <div className="h-[200px] w-full flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].formats.large.url}`}
            width={200}
            height={200}
            alt={product.Name || "Product Image"}
            className="h-full w-auto object-contain"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <h2 className="font-bold text-center">{product.Name}</h2>

      <div className="flex items-center gap-2">
        {product.sellingprice && (
          <h2 className="text-green-600 font-bold">₹ {product.sellingprice}</h2>
        )}
        <h2
          className={`text-gray-500 ${
            product.sellingprice && "line-through"
          }`}
        >
          {product.mrp}
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
            <div>
              <ProductItemDetail product={product} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
