"use client";

import React from "react";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { blogData } from "./blogData";
import BlogButton from "./BlogButton";

const Blog = () => {
  return (
    <div className="relative w-full flex flex-col lg:block mb-[10%]">
      <div className="lg:hidden w-full relative mb-6 flex justify-center items-center left-[8%]">
        <Image
          src="/man bought a lot of gifts at the store.png"
          alt="Blog Illustration"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain object-center"
        />
      </div>

      <div className="hidden lg:block absolute -left-[35%]  xl:-left-[15%] 2xl:-left-[5%] top-[0%] pointer-events-none z-20">
        <Image
          src="/man bought a lot of gifts at the store.png"
          alt="Blog Illustration"
          width={600}
          height={600}
          className="object-contain  w-[600px] h-[600px] 2xl:w-[800px] 2xl:h-[800px]" 
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 justify-start items-end w-full lg:w-auto">
        {blogData.map((item, index) => (
          <BlogCard
            key={index}
            title={item.title}
            description={item.description}
            count={item.count}
            image={item.image}
          />
        ))}
        <BlogButton />
      </div>
    </div>
  );
};

export default Blog;
