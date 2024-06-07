"use client";

import styled from "styled-components";
import BlogEditor from "@/components/blog/BlogEditor";
import BlogTools from "@/components/blog/BlogTools";
import BlogDetailEditor from "@/components/blog/BlogDetailEditor";
import { useAuth } from "@/context/AuthContext";
import { getUserDocument } from "@/db/account";
import { useState, useEffect } from "react";
import { createBlog } from "@/db/blogs";
import { toast, ToastContainer } from "react-toastify";
import { AccountTemplate } from "@/types/Templates";
import { useRouter } from "next/navigation";
import Loading from "@/universal/Loading";
import moment from "moment"

export default function BlogCreateMain() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<AccountTemplate | null>(null);
  const router = useRouter();

  const [value, setValue] = useState("## Hello World!");
  const [blogName, setBlogName] = useState("untitled");
  const [keywords, setKeywords] = useState<string[]>(["fun"]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [description, setDescription] = useState<string>("Write Blog Description");
  const [openInfo, setOpenInfo] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

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
    const result = await createBlog(
      userData.uid,
      user.photoURL,
      blogName,
      userData.name,
      value,
      keywords,
      description,
      coverImage,
    );
    if (result.success) {
      toast(result.message, { type: "success" });
      router.push("/dashboard");
    } else {
      console.log(result.error);
      alert(result.error)
      toast(result.message, { type: "error" });
    }
  };

  if (!userData) {
    return <Loading />;
  }

  return (
    <Main data-color-mode={darkTheme ? "dark" : "light"}>
      <ToastContainer />
      {openInfo && (
        <BlogDetailEditor
          mode="preview"
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
  position:relative;
  min-height:100vh;
`;
