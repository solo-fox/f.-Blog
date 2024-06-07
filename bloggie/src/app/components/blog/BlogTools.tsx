"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import moment from "moment";
import TagsInput from "@/components/TagsInput"

export default function BlogTools({
  blogName,
  setBlogName,
  value,
  setOpenInfo,
  switchTheme,
  setKeywords,
  keywords,
}) {
  const [wordsNumber, setWordsNumber] = useState(0);

  const countWords = (text) => {
    // Count words
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const wordsCount = words.length;
    setWordsNumber(wordsCount);
  };

  useEffect(() => {
    countWords(value);
  }, [value]);

  return (
    <Tools className="tools">
      <Details>
        <input
          className="blogname"
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
        />
        <TagsInput
        tags={keywords}
        setTags={setKeywords}
       />
      </Details>
      <Count>
        <div className="theme flex gap-[0.5rem]">
          <input
            name="dmode"
            type="checkbox"
            onChange={(e) => switchTheme((prev) => !prev)}
          />
          <label htmlFor="dmode">Dark Mode</label>
        </div>
        <p className="words">{wordsNumber} word</p>
        <p className="date">{moment().format("YYYY-MM-DD")}</p>
        <button className="btn-simple" onClick={e => setOpenInfo(true)}>
          Edit Info
        </button>
      </Count>
    </Tools>
  );
}

const Details = styled.div`
display:flex;
align-items:center;
 .blogname{
background:transparent;
font-size:30px;
outline:none;
transition:0.5s;
width:150px;
}
.blogname:focus{
  border-bottom:1px solid black;
}
`;

const Count = styled.div`
  display:flex;
  align-items:center;
  gap:2rem;
  flex-grow:1;
  justify-content:end;
`;

const Tools = styled.div`
  padding:0.5rem;
  display:flex;
  align-items:center;
  @media only screen and (max-width: 768px) {
    flex-wrap:wrap;
  }
`;
