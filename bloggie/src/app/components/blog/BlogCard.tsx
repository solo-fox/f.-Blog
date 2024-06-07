import styled from "styled-components";
import { CiImageOn } from "react-icons/ci";
import Skeleton from 'react-loading-skeleton'

export default function BlogCard({
  mode = 'edit',
  coverImage = undefined,
  setCoverImage = () => {},
  blogName = '',
  setBlogName = () => {},
  description = '',
  setDescription = () => {},
  date = "",
  id = undefined
}) {
  return (
    <Blog>
      <BlogContent>
        <BlogTitle>
          {mode === 'edit' ? (
            <TitleInput value={blogName} onChange={e => setBlogName(e.target.value)} />
          ) : (
            <span>{blogName || <Skeleton />}</span>
          )}
        </BlogTitle>
        <BlogDate>{date || <Skeleton />}</BlogDate>
        <BlogDescription>
          {mode === 'edit' ? (
            <DescriptionInput value={description} onChange={e => setDescription(e.target.value)} />
          ) : (
            <p>{description || <Skeleton />}</p>
          )}
        </BlogDescription>
        {id !== undefined ? ( <ReadMoreLink href={`/blog/${id}`}>Read Full Blog</ReadMoreLink>) : (<Skeleton />)}
      </BlogContent>
      <BlogImage>
        <Image>
          {mode === "edit" && !coverImage ? (
            <CiImageOn style={{ fontSize: "40px" }} />
          ) : (
            <>
              {coverImage !== undefined ? (<img src={coverImage} alt={blogName} />) : (<div className="flex-1"><Skeleton height={180}/></div>)}
            </>
          )}
        </Image>
        {mode === 'edit' && (
          <ImageInput
            placeholder="Add Image link"
            value={coverImage}
            onChange={e => setCoverImage(e.target.value)}
          />
        )}
      </BlogImage>
    </Blog>
  );
}

const Blog = styled.div`
  width: 80%;
  background:white;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  font-family: Arial, sans-serif;
  overflow: hidden;
  border-bottom:1px solid lightgray;
  padding-bottom:0.5rem;
  @media only screen and (max-width: 768px) {
    width:100%;
    grid-template-columns: 1fr 1fr;
  }
`;

const BlogImage = styled.div`
  display: grid;
  gap: 0.5rem;
  width: 100%;
`;

const Image = styled.div`
  width: 100%;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ImageInput = styled.input`
  padding-left: 16px;
  width: 100%;
`;

const BlogContent = styled.div`
  padding: 16px;
  display: grid;
  gap: 0.5rem;
`;

const BlogTitle = styled.h3`
  margin: 0;
  color: #1a202c;
  font-size: 1.25rem;
  font-weight: 600;
  width: 100%;
  span, input {
    width: 100%;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 600;
`;

const BlogDate = styled.p`
  margin: 0;
  color: #718096;
  font-size: 0.875rem;
  width: 100%;
`;

const BlogDescription = styled.div`
  margin: 0;
  color: #4a5568;
  width: 100%;
  p, textarea {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    resize: none;
  }
`;

const DescriptionInput = styled.textarea`
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow: hidden;
  resize: none;
`;

const ReadMoreLink = styled.a`
  color: #3182ce;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  margin-top:auto;
`;
