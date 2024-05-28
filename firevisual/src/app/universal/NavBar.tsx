"use client"

import React from 'react'
import { useState, useEffect} from 'react';
import { useAuth } from '@/context/AuthContext';
import styled from 'styled-components'
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import NextLink from "next/link"

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const { user } = useAuth()
  useEffect(() => {
    if (user.uid != null) {
      setLoggedIn(true)
    }
  }, []);


  return (
    <Nav>
      <NextLink href={loggedIn ? "/dashboard" : "/"}>
        <Logo>
          f.
        </Logo>
      </NextLink>
      <NavContent>
        {!loggedIn && (
        <Links>
          <NextLink href="/login">
            <button>
              <CiLogin />
              <span>Login</span>
            </button>
          </NextLink>
          <NextLink href="/register">
            <button>
              <FaUserPlus />
              <span>Sign Up</span>
            </button>
          </NextLink>
        </Links>
        )}
        {loggedIn && (
        <User>
          <FaUserPlus />
        </User>
        )}
      </NavContent>
    </Nav>
  )
}

const Nav = styled.nav`
 width:100vw;
 display: flex;
 align-items: center;
 padding: 0.5rem 1rem;
 background: #cd5334ff;
 heighh:20vh;
`

const Logo = styled.nav`
  font-family: "League Spartan", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-size: 40px;
  color: white;
`

const NavContent = styled.div`
 display: flex;
 align-items: center;
 flex-grow:1;
`

const Links = styled.div`
 display: flex;
 align-items: center;
 justify-content: flex-end;
 flex-grow:1;
 gap:1rem;
 button {
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #cd5334ff;
  font-weight:800;
  background: white;
  border-radius: 5px;
  transition:0.5s ease-in-out;
  &:hover{
    background: #cd5334ff;
    color: white;
 }
`

const User = styled.div`
  background: white;
  color: #cd5334ff;
  border-radius:50%;
  width:40px;
  height:40px;
  display: flex;
  align-items:center;
  justify-content:center;
  margin:0px 1rem;
`