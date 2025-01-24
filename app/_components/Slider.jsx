"use client"
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import GlobalApi from "../_utils/GlobalApi";

// This function will run on the server and fetch the slider data
export async function getServerSideProps() {
  let sliderList = [];
  try {
    const response = await GlobalApi.getSliders();
    sliderList = response.data.data;
  } catch (error) {
    console.error("Error fetching slider data:", error);
  }

  return {
    props: {
      sliderList, // Pass slider data as a prop to the component
    },
  };
}

const Slider = ({ sliderList }) => {
  return (
    <div >
      <Carousel>
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <div>
                {slider?.Image?.map((image, idx) => (
                  <Image
                    key={idx}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image?.url}`}
                    alt={slider?.Name || `Slider Image ${idx + 1}`}
                    className="object-cover h-[200px] md:h-[400px] w-full rounded-2xl" 
                    unoptimized={true}
                    objectFit="contain" 
                    width={1000}
                    height={400}
                  />
                ))} 
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Slider;
