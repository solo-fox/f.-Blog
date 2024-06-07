import styled from "styled-components";
import BlogCard from "@/components/blog/BlogCard"
import { IoMdClose } from "react-icons/io";
import { useState } from "react"

export default function BlogDetailEditor({
  mode = "edit",
  coverImage,
  setCoverImage,
  blogName,
  setBlogName,
  description,
  setDescription,
  setOpenInfo,
  publish
}) {
  const [editMode, setEditMode] = useState(true);
  return (
    <Detail>
      <DetailTools>
        <button className="btn-simple" onClick={publish}>Re-Publish</button>
        <IoMdClose onClick={e => setOpenInfo(false)} />
      </DetailTools>
      <BlogCard
        mode={editMode ? "edit" : "preview"}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        blogName={blogName}
        setBlogName={setBlogName}
        description={description}
        setDescription={setDescription}
        />
      <DetailTools>
        <div className="flex gap-[0.5rem]">
          <input
            type="checkbox"
            onChange={(e) => setEditMode(!editMode)}
          />
          Showcase
        </div>
      </DetailTools>
    </Detail>
  )
}

  const DetailTools = styled.div`
  display:flex;
  align-items:center;
  padding:0.5rem;
  justify-content:space-between;
  background:white;
  width:50%;
  border-radius:5px;
  `

  const Detail = styled.div`
  display:flex;
  align-items:center;
  padding:0.5rem;
  justify-content:center;
  flex-direction:column;
  gap:1rem;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:100%;
  height:100%;
  z-index:10;
  background:hsla(42.8,0%,61.2%,0.5);
  `