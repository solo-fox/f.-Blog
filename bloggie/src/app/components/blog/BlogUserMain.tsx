"use client"

import styled from "styled-components";
import BlogCard from "@/components/blog/BlogCard"
import DashboardContent from "@/components/dashboard/DashboardContent"
import Loading from "@/universal/Loading";
import { getBlogs } from "@/db/blogs"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument} from "@/db/account";
import { getBlogById} from "@/db/blogs";
import { BlogTemplate } from "@/types/Templates";
import { useParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Link from "next/link"
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { AccountTemplate } from "@/types/Templates";

export default function BlogUserMain() {
  const { id } = useParams();
  const { user } = useAuth()
  const [blogsData, setBlogs] = useState<BlogTemplate | null>([])
  const [owner, setOwner] = useState<boolean>(false)
  const [userData, setUserData] = useState<AccountTemplate | null>(null);
  
  useEffect(()=>{
    const getUserBlogs = async () => {
      const result = await getUserDocument(id);
      if(result.success) {
        setUserData(result.payload);
        if(result.payload.uid == user.uid){
          setOwner(true)
        }
      } else {
        console.log(result.error);
        toast(result.message, { type: "error" });
      }
      
      const blogs = result.payload.blogs
      if (blogs && blogs.length > 0) {
        const fetchedBlogs = [];
        for (const id of blogs.slice(0,3)) {
          const blog = await getBlogById(id);
          if (blog.success) {
            fetchedBlogs.push(blog.payload);
          } else {
            console.error(result.error);
            toast(blog.message, { type: "error" });
          }
        }
        setBlogs(fetchedBlogs);
      }
    }
    getUserBlogs()
  },[])
  
  if(!userData) {
    return <Loading />;
  }
  
  return (
    <Main>
    <ToastContainer />
    <DashboardHeader 
      greeting={"Hello I am,  "}
      name={userData.name} 
      facebook={userData.facebook} 
      twitter={userData.twitter} 
      github={userData.github} 
      websiteLink={userData.websiteLink} 
    />
    <DashboardContent bio={userData.bio} likes={userData.likes} followers={userData.followers.length} blogs={userData.blogs} />
    <Blogs>
      {blogsData && blogsData.map((blog) => (
      <UserBlog>
      <BlogCard 
        key={blog.id}
        mode="preview"
        coverImage={blog.cover}
        blogName={blog.title}
        description={blog.description}
        date={blog.date}
        id={blog.id}
      />
      <BlogData>
        {owner && (
        <Link href={`/blog/edit/${blog.id}`}>
          <FaRegEdit />
        </Link>
        )}
        <div className="item">
          <FcLike />
          {blog.likes}
        </div>
        <div className="item">
          <FaRegEye />
          {blog.views}
        </div>
      </BlogData>
      </UserBlog>
    ))}
    </Blogs>
    </Main>
  )
}

const Main = styled.div`
  padding: 2rem 4rem 1rem 4rem;
  background: white;
  flex-grow:1;
  display: flex;
  flex-direction:column;
  gap:1rem;
  h1{
    font-size:40px;
    font-weight:700;
  }
`;

const Blogs = styled.div`
  background: white;
  flex-grow:1;
  display: flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
`;

const UserBlog = styled.div`
  display: flex;
  gap:1rem;
  align-items:center;
  justify-content:center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const BlogData = styled.div`
  display: flex;
  gap:1rem;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  height:100%;
  .item { gap:0.5rem; display:flex; flex-direction: column; align-items:center;flex-grow:1;}
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    width:100%;
    .item { gap:0.5rem; display:flex; flex-direction: row; align-items:center;flex-grow:1;}
  }
`