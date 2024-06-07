"use client";

import styled, { css } from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { searchEngine } from "@/typesense";
import Link from "next/link";
import { useState } from 'react';

export default function HomeNav({ setBlogs, originalBlogs }) {
  const [activeFilters, setActiveFilters] = useState(['title', 'keywords', 'content', 'author', 'date', 'description']);

  const search = async (query) => {
    if (query === "") {
      setBlogs(originalBlogs);  // Reset to the original list of blogs
    } else {
      let searchQuery = {
        'q': query,
        'query_by': activeFilters.join(', '),
      };

      searchEngine.collections('blogs')
        .documents()
        .search(searchQuery)
        .then(function (searchResults) {
          let filteredBlogs = [];
          searchResults.hits.forEach(hit => {
            const blog = originalBlogs.find(blog => blog.id == hit.document.id);
            if (blog) {
              filteredBlogs.push(blog);
            }
          });
          setBlogs(filteredBlogs);
        })
        .catch(error => {
          console.error('Search error:', error);
        });
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(f => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  return (
    <NavContainer>
      <Search>
        <SearchBar>
          <input placeholder="Search..." onChange={e => search(e.target.value)} />
          <button>
            <CiSearch />
          </button>
        </SearchBar>
      </Search>
      <SearchTitle>
        <NavItem 
          active={activeFilters.includes('title, keywords, content, author, date, description')} 
          onClick={() => handleFilterChange('title, keywords, content, author, date, description')}
        >
          All
        </NavItem>
        <NavItem 
          active={activeFilters.includes('title')} 
          onClick={() => handleFilterChange('title')}
        >
          Title
        </NavItem>
        <NavItem 
          active={activeFilters.includes('description')} 
          onClick={() => handleFilterChange('description')}
        >
          Description
        </NavItem>
        <NavItem 
          active={activeFilters.includes('author')} 
          onClick={() => handleFilterChange('author')}
        >
          Author
        </NavItem>
        <NavItem 
          active={activeFilters.includes('date')} 
          onClick={() => handleFilterChange('date')}
        >
          Date
        </NavItem>
        <NavItem 
          active={activeFilters.includes('content')} 
          onClick={() => handleFilterChange('content')}
        >
          Content
        </NavItem>
      </SearchTitle>
    </NavContainer>
  );
};

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SearchTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  width:100%;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  width: 80%;
  gap: 0.5rem;
`;

const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#cd5334ff' : '#ebebeb'};
  color: ${props => props.active ? '#fff' : 'gray'};
  border-radius: 5px;
  padding: 0.5rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    color: ${props => props.active ? '#fff' : '#000'};
  }

  & svg {
    margin-right: 8px;
  }
`;

const SearchBar = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  input {
    outline: none;
    padding: 0.5rem 2.5rem 0.5rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 45%;

    &:focus {
      border-bottom: 1px solid black;
    }
  }

  button {
    position: absolute;
    top: 50%;
    left: calc(50% + 20.5%);
    transform: translate(-50%, -50%);
  }
  @media only screen and (max-width: 768px){
    input { width:100%;}
    button {left: calc(50% + 40.5%); }
  }
`;