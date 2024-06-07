"use client"

import styled from 'styled-components'
import Link from "next/link"
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function DashboardHeader({ greeting = "Welcome, " ,name , websiteLink, twitter, github , facebook }: Readonly<{ name: string, websiteLink: string | null , twitter: string | null, github: string | null , facebook: string | null}>) {
  return (
    <Header>
      <Greeting>
          <h1>
            {greeting}{name} ! 🖖
          </h1>
        <span>Be smart. Be useful.</span>
      </Greeting>
      <Links>
        {facebook && <Link href={`${facebook}`}><FaFacebook /></Link>}
        {github && <Link href={`${github}`}><FaGithub /></Link>}
        {twitter && <Link href={`${twitter}`}><FaXTwitter /></Link>}
        {websiteLink && <Link href={`${websiteLink}`}><CgWebsite /></Link>}
      </Links>
    </Header>
  )
}

const Header = styled.div`
 display:flex;
 align-items:center;
 justify-content:space-between;
 padding:0px 1rem;
 @media only screen and (max-width: 768px) {
  flex-direction:column;
}
`

const Links = styled.div`
  display:flex;
  gap:2rem;
  svg{
  font-size:25px;
  }
`

const Greeting = styled.div`
  h1 {
    color: #181515;
    font-size: 30px;
  }
  span {
    color: lightgray;
  }
  margin-bottom: 2rem;
  @media only screen and (max-width: 768px) {
    h1 { font-size: 23px }
  }
`;