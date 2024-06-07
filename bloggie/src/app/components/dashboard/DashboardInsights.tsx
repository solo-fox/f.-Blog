import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CiPen } from 'react-icons/ci';
import { getBlogById } from "@/db/blogs";
import { toast, ToastContainer } from "react-toastify";
import { BlogTemplate } from "@/types/Templates";
import DasboardInsightsBlogShowcase from '@/components/dashboard/DasboardInsightsBlogShowcase';
import DashboardInsightsTable from '@/components/dashboard/DashboardInsightsTable';
import Link from "next/link";

export default function DashboardInsights({ activity, uid, blogs }: Readonly<{ activity: string[] | null, uid: string, blogs: string[] | null }>) {
  const [recentBlogs, setRecentBlogs] = useState<BlogTemplate[] | null>(null);

  useEffect(() => {
    const getBlogData = async () => {
      if (blogs && blogs.length > 0) {
        const fetchedBlogs = [];
        for (const id of blogs.slice(0,3)) {
          const result = await getBlogById(id);
          if (result.success) {
            fetchedBlogs.push(result.payload);
          } else {
            console.error(result.error);
            toast(result.message, { type: "error" });
          }
        }
        setRecentBlogs(fetchedBlogs);
      }
    };

    getBlogData();
  }, []);

  return (
    <Insights>
      <ToastContainer />
      <DashboardInsightsTable activity={activity} />
      <BlogSection>
        <BlogSectionHeader>
          <h1> Recent blogs </h1>
          <Link href={`/blog/user/${uid}`}>
            More...
          </Link>
        </BlogSectionHeader>
        {recentBlogs && recentBlogs.map((blogRef, index) => (
          <DasboardInsightsBlogShowcase key={index} likes={blogRef.likes} views={blogRef.views} name={blogRef.title} id={blogRef.id} />
        ))}
        {(!recentBlogs || recentBlogs.length == 0) && (
          <div className="no-activity">
            <Link href="/blog/create">
              <button className="btn-intr">Begin Writing<CiPen /></button>
            </Link>
          </div>
        )}
      </BlogSection>
    </Insights>
  );
}

const BlogSectionHeader = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: lightgray;
  }
`;

const BlogSection = styled.div`
  background: white;
  border-radius: 5px;
  width: 50%;
  max-height: 100%;
  padding: 1rem;
  min-height: 200px;
  overflow: scroll;
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media only screen and (max-width: 768px) {
    width:100%;
  }
`;

const Insights = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  @media only screen and (max-width: 768px) {
    flex-direction:column;
  }
`;
