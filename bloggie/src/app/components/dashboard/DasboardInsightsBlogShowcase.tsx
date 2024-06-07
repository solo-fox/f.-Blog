"use client"

import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

export default function DashboardInsightsBlogShowcase({ name, likes, views, id }) {
  return (
    <BlogShowcase>
      <BlogTitle>
        {name}
      </BlogTitle>
      <BlogData>
        <DataItem>
          {likes}
          <FcLike />
        </DataItem>
        <DataItem>
          {views}
          <FaRegEye />
        </DataItem>
        <DataItem>
          <Link href={`/blog/edit/${id}`}>
            <FaRegEdit />
          </Link>
        </DataItem>
      </BlogData>
    </BlogShowcase>
  );
}

const BlogShowcase = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: auto;
  gap: 0.5rem;
`;

const BlogTitle = styled.h1`
  font-size: 16px;
  width: 50%;
`;

const BlogData = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  align-items: center;
  font-size: 10px;
`;

const DataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
