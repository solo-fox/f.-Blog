"use client";

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CiLogin, CiSearch } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import NavBarCallToAction from '@/components/NavBarCallToAction';
import Link from "next/link";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    if (user?.uid != null) {
      setLoggedIn(true);
    }
  }, [user]);
  
  return (
    <>
    <Nav>
      <Link href="/">
        <Logo>f.</Logo>
      </Link>
      <NavContent>
        {!loggedIn && (
          <Links>
            <Link href="/login">
              <button className="btn-intr">
                <CiLogin />
                <span>Login</span>
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-intr">
                <FaUserPlus />
                <span>Sign Up</span>
              </button>
            </Link>
          </Links>
        )}
        {loggedIn && (
          <NavBarCallToAction photo={user.photoURL} logOutFn={logOut} />
        )}
      </NavContent>
    </Nav>
    </>
  );
}

const Nav = styled.nav`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: white;
  height: 10vh;
  position: sticky;
  top: 0px;
  z-index:100;
`;

const Logo = styled.div`
  font-family: "League Spartan", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-size: 40px;
  color: #cd5334ff;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow:1;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 1rem;
`;