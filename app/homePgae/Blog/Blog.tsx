"use client";

import React from "react";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { blogData } from "./blogData";
import BlogButton from "./BlogButton";

const Blog = () => {
  return (
    <div className="relative w-full flex flex-col lg:block mb-[10%]">
      {/* Background/Illustration Image */}

      <div className="lg:hidden w-full relative mb-6 flex justify-center items-center left-[8%]">
        <Image
          src="/blog.png"
          alt="Blog Illustration"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain object-center"
        />
      </div>

      {/* Desktop: Absolute Left Image */}
      <div className="hidden lg:block absolute -left-[35%]  xl:-left-[15%]  -top-[18%] pointer-events-none z-20">
        <Image
          src="/blog.png"
          alt="Blog Illustration"
          width={900}
          height={900}
          className="object-contain  w-[900px] h-[900px]"
        />
      </div>

      {/* Cards List */}
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
