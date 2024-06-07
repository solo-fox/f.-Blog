"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { LoginType } from '@/types/AuthTypes';
import { getUserDocument } from "@/db/account";
import Link from "next/link";
import styled from "styled-components";

export default function LoginForm() {
  const [data, setData] = useState<LoginType>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | boolean>(false);

  const { logIn } = useAuth();
  const router = useRouter();
  
  const handleLogin = async (e: any) => {
    e.preventDefault();
    let regex = new RegExp("^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
    if(regex.test(data.email) == true) {
      setError("Email must be valid.");
      return;
    }
    if(!(data.password.length >= 8)){
      setError("Password must be 8 characters long.");
      return 1;
    }
    setError(false);
    try {
      const credentials = await logIn(data.email, data.password);
      const checkUserDoc = await getUserDocument(credentials.user.uid);
      if(checkUserDoc.success) {
        router.push('/dashboard');
      } else {
        setError(checkUserDoc.message);
        return 1;
      }
    } catch (error: unknown) {
      if(error.code == "auth/invalid-credential") {
        setError("Invalid Credentials!");
        return 1;
      }
      setError(error.message);
      console.log(error);
      return 1;
    }
  };

  const { ...allData } = data;

  const canSubmit = [...Object.values(allData)].every(Boolean);

  return (
    <Main>
      <Form>
        <Card>
          <Title>Login to Your Account</Title>
          <InputGroup>
            <input 
              type="email" 
              placeholder="Email" 
              value={data.email} 
              onChange={e => setData({ ...data, email: e.target.value })} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={data.password} 
              onChange={e => setData({ ...data, password: e.target.value })} 
            />
            {error && (
              <Error>
                <span>{error}</span>
              </Error>
            )}
            <button onClick={handleLogin} disabled={!canSubmit} className="btn-intr">Login</button>
            <Link href="/register">Register <FiChevronRight /></Link>
          </InputGroup>
        </Card>
      </Form>
      <Register>
        <Logo>f.</Logo>
        <h1>New Here?</h1>
        <p>Sign up and discover a great <br/> amount of opportunities!</p>
        <button className="btn-intr">
          <Link href="/register">Sign Up</Link>
        </button>
      </Register>
    </Main>
  );
}

const Main = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px; 
  height:100vh;
  overflow:hidden;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    align-items: start;
    margin-top: 5rem;
    a {
      display: flex;
      align-items: center;
    }
  }
`;

const Card = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 1rem;
  p {
    width: 80%; 
    text-align: center; 
    border-bottom: 1px solid #000; 
    line-height: 0.1em;
    margin: 10px 0 20px; 
  } 
  p span { 
    background: #fff; 
    padding: 0 10px; 
  }
  @media only screen and (max-width: 768px) {
    width: 80%;
    text-align: center;
  }
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 25px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 1rem;
  input {
    outline: #cd5334ff;
    color: black;
    padding: 0.25rem;
    border-radius: 5px;
    background: #c4c4c4b3;
  }
  button {
    padding: 0.25rem 2rem;
    background: #cd5334ff;
    color: white;
  }
`;

const Error = styled.div`
  color: red;
  text-align: center;
`;

const Register = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: start;
  padding-top: 5rem;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  background: #cd5334ff;
  color: white;
  overflow: hidden;
  h1 {
    font-size: 40px;
    z-index: 2;
  }
  p { 
    z-index: 2; 
  }
  @media only screen and (max-width: 768px){
    display: none;
  }
`;

const Logo = styled.div`
  font-family: "League Spartan", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-size: 80px;
  color: white;
`;
