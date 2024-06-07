"use client"

import styled from "styled-components";
import { getBlogs } from "@/db/blogs";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BlogCard from "@/components/blog/BlogCard";
import HomeNav from "@/components/home/HomeNav";
import { BlogTemplate } from "@/types/Templates";

export default function HomeMain() {
  const [blogsData, setBlogs] = useState<BlogTemplate | unknown[]>([{},{},{},{},{}]);
  const [loading, setLoading] = useState<boolean>(true);
  const [originalBlogs, setOriginalBlogs] = useState<BlogTemplate | unknown[]>([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await getBlogs();
      if (blogs.success) {
        let blogDataArray = [];
        blogs.payload.forEach(blog => {
          blogDataArray.push(blog.data());
        });
        setBlogs(blogDataArray);
        setOriginalBlogs(blogDataArray);// Store the original list of blogs
        setLoading(false)
      } else {
        toast(blogs.message, { type: "error" });
      }
    };
    getAllBlogs();
  }, []);

  return (
    <Main>
      <ToastContainer />
      <HomeNav setBlogs={setBlogs} originalBlogs={originalBlogs} />
      {loading && (
        <>
          {blogsData && blogsData.map(blog => (
            <BlogCard
              mode="preview"
              coverImage={undefined}
              blogName={undefined}
              description={undefined}
              date={undefined}
              id={undefined}
            />
          ))}
        </>
      )}
      {(blogsData && !loading) && blogsData.map((blog) => (
        <BlogCard
          key={blog.id}
          mode="preview"
          coverImage={blog.cover}
          blogName={blog.title}
          description={blog.description}
          date={blog.date}
          id={blog.id}
        />
      ))}
    </Main>
  );
}

const Main = styled.div`
  padding: 0.5rem 4rem 1rem 4rem;
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
