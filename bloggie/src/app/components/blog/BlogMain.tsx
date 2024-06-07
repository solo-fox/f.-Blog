"use client"

import styled from "styled-components";
import BlogEditorExt from "@/components/blog/BlogEditorExt"
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState, useEffect} from "react"
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import BlogCard from "@/components/blog/BlogCard"
import { useParams } from "next/navigation"
import { getBlogById, updateBlog} from "@/db/blogs";
import { updateUserDocument, getUserDocument} from "@/db/account";
import { BlogTemplate } from "@/types/Templates";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/universal/Loading";
import Link from "next/link"

export default function BlogMain() {
  const { id }= useParams();
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [blogName, setBlogName] = useState("");
  const [keywords, setKeywords] = useState<string[]>(null);
  const [blogAuthor, setBlogAuthor] = useState<string>("Author");
  const [blogAuthorUid, setBlogAuthorUid] = useState<string | null>(null);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [date, setBlogDate] = useState<string>("YYYY-MM-DD");
  const [coverImage, setCoverImage] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [followT, setFollow] = useState<string>("follow");
  const [recentBlogs, setRecentBlogs] = useState<BlogTemplate[] | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      const blogData = await getBlogById(id);
      if (blogData.success) {
        // Unimportant if doesnot work, actually 
        await updateBlog(id, { views : blogData.payload.views + 1})
        ///
        setCoverImage(blogData.payload.cover) 
        setValue(blogData.payload.content);
        setBlogName(blogData.payload.title);
        setKeywords(blogData.payload.keywords);
        setLikes(blogData.payload.likes)
        setBlogAuthorUid(blogData.payload.uid)
        setBlogAuthor(blogData.payload.author)
        setBlogDate(blogData.payload.date)
        setPhoto(blogData.payload.photoURL)
        setBlogId(blogData.payload.id)
      } else {
        toast(blogData.message, { type: "error" });
      }
    };
    getBlog();
  }, [id]);
  
  const getAuthorRecentBlogs = async () => {
      const result = await getUserDocument(blogAuthorUid);
      if(!result.success) {
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
        setRecentBlogs(fetchedBlogs);
      }
    }
    
  const like = async () => {
    if(user.uid == null){
      taost("You are not logged in!", { type: "warning "})
      return
    }
    const userData = await getUserDocument(blogAuthorUid)
    if(userData.payload.likedBlogs.includes(blogId)){
      await updateBlog(blogId, { likes: likes - 1})
      setLikes(likes-1)
      await updateUserDocument(user.uid, { likedBlogs : userData.payload.likedBlogs.filter(id => id !== blogId)})
    } else {
      await updateBlog(blogId, { likes: likes + 1})
      setLikes(likes+1)
      await updateUserDocument(user.uid, { likedBlogs : [...userData.payload.likedBlogs, blogId]})
    }
  }
  
  const follow = async () => {
    if(user.uid == null){
      toast("You are not logged in!", { type: "warning "})
      return
    }
    const userData = await getUserDocument(user.uid)
    const authorData = await getUserDocument(blogAuthorUid)
    if(userData.payload.follow.includes(blogAuthorUid)){
      await updateUserDocument(user.uid, { follow: userData.payload.follow.filter(id => id !== blogAuthorUid)})
      await updateUserDocument(blogAuthorUid, { followers : authorData.payload.followers.filter(id => id !== user.uid)})
      setFollow("follow")
    } else {
      await updateUserDocument(user.uid, { follow: [...userData.payload.follow, blogAuthorUid]})
      await updateUserDocument(blogAuthorUid, { followers : [...authorData.payload.followers, user.uid]})
      setFollow("Unfollow")
    }
  }
  
  
  if (!blogId && !blogAuthorUid) {
    return <Loading />;
  }
  getAuthorRecentBlogs()
  return (
    <Main>
      <ToastContainer />
      <Content data-color-mode="light">
        <Image>
          <img src={coverImage} alt={coverImage}/>
        </Image>
        <User>
            <UserProfile>
              <img src={photo}/>
            </UserProfile>
            <UserData>
             <Link href={`/blog/user/${blogAuthorUid}`}>
              <h2>{blogAuthor}</h2>
              <p>{date}</p>
             </Link>
            </UserData>
          <button className="btn-simple ml-[auto] text-[black]" onClick={like}>
            <FcLike />
            {likes}
          </button>
        </User>
        <h1>{blogName}</h1>
        <Keywords>
        {keywords && keywords.map((keyword) => (
          <p># {keyword}</p>
        ))}
        </Keywords>
        <MarkdownPreview 
          source={value} 
          components={{
            code: BlogEditorExt
          }}
          style={{ padding: 16, width: "100%", background: "transparent"}} 
        />
      </Content>
      <More>
        <User>
            <UserProfile>
              <img src={photo}/>
            </UserProfile>
            <UserData>
              <Link href={`/blog/user/${blogAuthorUid}`}>
                <h2>{blogAuthor}</h2>
              </Link>
            </UserData>
          <button className="btn-intr ml-[auto]" onClick={follow}>
            {followT}
          </button>
        </User>
        <Blogs>
        {recentBlogs && recentBlogs.map((blog) => (
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
        </Blogs>
      </More>
    </Main>
  )
}

const Blogs = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  padding:1rem 0rem;
  flex-wrap:wrap;
`
const More = styled.div`
  padding:1rem;
  background: #f1f1f16d;
  width:100%;
  display:flex;
  flex-direction:column;
`

const Keywords = styled.div`
display:flex;
align-items: center;
gap:2rem;
font-size:18px;
padding:0px 1rem;
`

const User = styled.div`
width:100%;
display:flex;
padding:0px 1rem;
align-items:center;
gap:1.5rem;
height:40px;
overfliw:hidden;
`

const UserProfile = styled.div`
img{
width:50px;
height:50px;
border-radius:50%;
}
`
const UserData = styled.div`
h2{
  font-weight:700;
}
p{
  color: lightgray;
}
`

const Actions = styled.div`
 width:100%;
 font-size:22px;
 display:flex;
 align-items: center;
 padding:0.5rem 1rem;
 border-top: 1px solid lightgray;
 gap:5rem;
 padding:1rem;
`

const Content = styled.div`
width:100%;
overflow:hidden;
display:flex;
padding:1rem;
flex-direction:column;
gap:2rem;
h1{
  font-size:40px;
  font-weight:800;
  padding:0px 1rem;
}
`
const Image = styled.div`
width:100%;
align-items:center;
justify-content: center;
display: flex;
img {
border-radius:5px 5px 0px 0px;
width:100%;
}
`

const Main = styled.div`
  flex-grow: 1;
  display:flex;
  flex-direction:column;
  position:relative;
  gap:4rem;
  justify-content:center;
  align-items:center;
`;