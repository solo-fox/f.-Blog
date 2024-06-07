"use client";

import styled from "styled-components";
import BlogEditor from "@/components/blog/BlogEditor";
import BlogDetailEditor from "@/components/blog/BlogDetailEditor";
import BlogTools from "@/components/blog/BlogTools";
import Loading from "@/universal/Loading";
import { useAuth } from "@/context/AuthContext";
import { getUserDocument } from "@/db/account";
import { useState, useEffect } from "react";
import { getBlogById, updateBlog} from "@/db/blogs";
import { BlogTemplate } from "@/types/Templates";
import { toast, ToastContainer } from "react-toastify";
import { AccountTemplate } from "@/types/Templates";
import moment from "moment"
import { useRouter } from "next/navigation";

export default function BlogEditMain({ id }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState<AccountTemplate | null>(null);
  const router = useRouter();
  
  const [value, setValue] = useState("## Hello World!");
  const [blogName, setBlogName] = useState("untitled");
  const [keywords, setKeywords] = useState<string[]>(["fun"]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [description, setDescription] = useState<string>("Write Blog Description");
  const [openInfo, setOpenInfo] = useState(false);
  const [blogAuthorId, setBlogAuthorId] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      const blogData = await getBlogById(id);
      if (blogData.success) {
        setValue(blogData.payload.content);
        setBlogName(blogData.payload.title);
        setKeywords(blogData.payload.keywords);
        setCoverImage(blogData.payload.cover)
        setDescription(blogData.payload.description)
        setBlogAuthorId(blogData.payload.uid)
      } else {
        toast(blogData.message, { type: "error" });
      }
    };
    getBlog();
  }, [id]);
  
  useEffect(() => {
    const getUserData = async () => {
      const userDocumentData = await getUserDocument(user.uid);
      if (userDocumentData.success) {
        setUserData(userDocumentData.payload);
      } else {
        toast(userDocumentData.message, { type: "error" });
      }
    };
    getUserData();
  }, [user.uid]);
  
  
  const publish = async () => {
    const result = await updateBlog(id , {content: value, title: blogName, keywords, description, cover: coverImage, photo: user.photoURL} );
    if (result.success) {
      toast(result.message, { type: "success" });
    } else {
      console.log(result.error);
      toast(result.message, { type: "error" });
    }
  }
  
  if (!userData) {
    return <Loading />;
  }
  if(blogAuthorId !== user.uid){
    router.push("/dashboard")
  }
  
  return (
    <Main data-color-mode={darkTheme ? "dark" : "light"}>
      <ToastContainer />
      {openInfo && (
        <BlogDetailEditor
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          blogName={blogName}
          setBlogName={setBlogName}
          description={description}
          setDescription={setDescription}
          setOpenInfo={setOpenInfo}
          publish={publish}
        />
      )}
      <BlogTools
        switchTheme={setDarkTheme}
        setOpenInfo={setOpenInfo}
        value={value}
        blogName={blogName}
        setBlogName={setBlogName}
        setKeywords={setKeywords}
        keywords={keywords}
      />
      <BlogEditor value={value} setValue={setValue} />
    </Main>
  );
}

const Main = styled.div`
  background: #f1f1f16d;
  flex-grow: 1;
  display:flex;
  flex-direction:column;
  min-height:100vh;
`;