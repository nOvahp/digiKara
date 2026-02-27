'use client';

import React from 'react';
import Image from 'next/image';
import BlogCard from './BlogCard';
import { blogData } from './blogData';
import BlogButton from './BlogButton';

const Blog = () => {
  return (
    <div className="w-full mb-16 lg:mb-24">
      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-4 mb-4">
        {/* 1. Title */}
        <div className="w-full text-center">
          <span className="font-['PeydaWeb'] font-extrabold text-4xl text-[#1A1C1E] leading-tight whitespace-nowrap">
            محصولات هنرستان‌ها
          </span>
        </div>
        {/* 2. Image */}
        <Image
          src="/man bought a lot of gifts at the store.png"
          alt="Blog Illustration"
          width={500}
          height={500}
          className="w-[60%] h-auto object-contain mx-auto"
        />
        {/* 3. Cards */}
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

      {/* Desktop - two-column flex row */}
      <div className="hidden lg:flex flex-row items-start gap-6 xl:gap-10">
        {/* Left column: title top, image bottom */}
        <div className="flex flex-col items-start w-[36%] xl:w-[38%] shrink-0 pt-2 min-h-[640px] xl:min-h-[720px]">
          <span className="font-['PeydaWeb'] font-extrabold text-4xl xl:text-5xl 2xl:text-6xl text-[#1A1C1E] leading-tight whitespace-nowrap">
            محصولات هنرستان‌ها
          </span>
          <Image
            src="/man bought a lot of gifts at the store.png"
            alt="Blog Illustration"
            width={480}
            height={480}
            className="w-full h-auto object-contain mt-auto"
          />
        </div>
        {/* Right column: cards */}
        <div className="flex flex-col gap-4 xl:gap-6 flex-1 items-end max-w-[580px] xl:max-w-none ml-auto">
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
    </div>
  );
};

export default Blog;
