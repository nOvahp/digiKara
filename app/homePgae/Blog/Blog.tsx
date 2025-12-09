"use client";

import React from "react";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { blogData } from "./blogData";

const Blog = () => {
  return (
    <div className="relative w-full">
      {/* Background/Illustration Image */}
      <div className="absolute w-[140%] h-[140%] -left-[10%] -top-[20%] overflow-hidden pointer-events-none z-20 border">
        <Image
          src="/blog.png"
          alt="Blog Illustration"
          fill
          className="object-contain object-left"
        />
      </div>

      {/* Cards List */}
      <div className="relative z-10 flex flex-col gap-6 justify-start items-end w-full">
        {blogData.map((item, index) => (
          <BlogCard
            key={index}
            title={item.title}
            description={item.description}
            count={item.count}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
