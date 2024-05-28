"use client"

import { useAuth } from '@/context/AuthContext';
import { RegistrationType } from '@/types/AuthTypes';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import styled from "styled-components"

export default function RegistrationForm() {
  const [data, setData] = useState<RegistrationType>({
      email: '',
      password: ''
  });

  // Use the signUp method from the AuthContext
  const { signUp } = useAuth();
  const router = useRouter();

  const handleRegistration = async (e: any) => {
      e.preventDefault();
      try {
          await signUp(data.email, data.password);
          router.push('/dashboard');
      } catch (error: any) {
          console.log(error.message);
      }
      console.log(data);
  };

  // Destructure data from the data object
  const { ...allData } = data;

  // Disable submit button until all fields are filled in
  const canSubmit = [...Object.values(allData)].every(Boolean);

  return (
        <Main>
            <Card>
                <Form action="" onSubmit={handleRegistration} className="group">
                    <Title>Register</Title>
                    <Paragraph>Create a new account</Paragraph>
                    <div className="mb-5">
                        <Label htmlFor="email">Your email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            required
                            pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            placeholder="name@company.com"
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    email: e.target.value
                                });
                            }}
                        />
                        <ErrorMessage>Please enter a valid email address.</ErrorMessage>
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="password">Your password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            pattern=".{8,}"
                            required
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    password: e.target.value
                                });
                            }}
                        />
                        <ErrorMessage>Password must be at least 8 characters.</ErrorMessage>
                    </div>
                    <Button type="submit" disabled={!canSubmit}>
                        Create account
                    </Button>
                    <LinkWrapper>
                        <Link href="/login">
                            <FiChevronLeft /> Login Instead
                        </Link>
                    </LinkWrapper>
                </Form>
            </Card>
        </Main>
    );
}

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow:1;
`;

const Card = styled.div`
    width: 100%;
    max-width: 20rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    background-color: #fff;
    padding: 2rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h5`
    margin-bottom: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: #000;
`;

const Paragraph = styled.p`
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #000;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #000;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #cbd5e0;
    background-color: #f7fafc;
    padding: 0.625rem;
    font-size: 0.875rem;
    color: #000;
    &:focus {
        border-color: #cd5334ff;
        outline: none;
        box-shadow: 0 0 0 3px rgba(205, 83, 52, 0.5);
    }
`;

const ErrorMessage = styled.span`
    margin-top: 0.25rem;
    display: none;
    font-size: 0.875rem;
    color: #f56565;
`;

const Button = styled.button`
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: #cd5334ff;
    padding: 0.625rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: #fff;
    &:hover {
        background-color: #a84228;
    }
    &:disabled {
        cursor: not-allowed;
        background: linear-gradient(to bottom right, #f7fafc, #e2e8f0);
        color: #a0aec0;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(205, 83, 52, 0.5);
    }
`;

const LinkWrapper = styled.div`
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 500;
    color: #000;
`;

const Link = styled(NextLink)`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: #000;
    &:hover {
        color: #cd5334ff;
        text-decoration: underline;
    }
`;