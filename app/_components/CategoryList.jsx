"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

function CategoryList() {
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };
  return (
    <div className="mt-8">
  <h2 className="text-green-600 font-bold text-2xl">Shop By Category</h2>
  <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"> 
    {CategoryList.map((category, index) => (
      <div
        key={index}
        className="flex mt-2 flex-col items-center bg-green-100
             p-3 gap-2 rounded-lg group cursor-pointer hover:bg-green-500 hover:text-white"
      >
        {category?.Icon?.map((icon, iconIndex) => (
          <Image
            key={iconIndex}
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${icon?.url}`}
            unoptimized={true}
            width={55} 
            height={55}
            alt={`icon-${iconIndex}`}
            className="group-hover:scale-125 transition-all ease-in-out "
          />
        ))}
        <h2 className="text-center text-sm font-medium">{category?.Name}</h2>
      </div>
    ))}
  </div>
</div>

  );
}

export default CategoryList;
