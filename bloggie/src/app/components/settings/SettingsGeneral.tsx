"use client"

import styled from "styled-components"
import { CiImageOn } from "react-icons/ci";

export default function SettingsGeneral({
  bio, setBio, name, setName, previewImageLink, setPreviewImageLink,
  facebookLink, setFacebookLink, githubLink, setGithubLink,
  twitterLink, setTwitterLink, personalWebsiteLink, setPersonalWebsiteLink,
  handleUpdate
}) {
  return (
    <Section>
      <Image>
        {!previewImageLink && (
          <CiImageOn />
        )}
        {previewImageLink && (
          <img src={previewImageLink} />
        )}
      </Image>
        <input 
          type="url" 
          placeholder="Preview Image Link" 
          value={previewImageLink !== null ? previewImageLink : ""} 
          onChange={(e) => setPreviewImageLink(e.target.value)} 
        />
      <UsersData>
        <h2>Tell us about yourself!</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <textarea 
          placeholder="Bio" 
          value={bio !== null ? bio : ""} 
          onChange={(e) => setBio(e.target.value)} 
        />
        
        <h2>How to reach you!</h2>
        <input 
          type="url" 
          placeholder="Facebook Link" 
          value={facebookLink !== null ? facebookLink : ""} 
          onChange={(e) => setFacebookLink(e.target.value)} 
        />
        <input 
          type="url" 
          placeholder="Github Link" 
          value={githubLink !== null ? githubLink : ""} 
          onChange={(e) => setGithubLink(e.target.value)} 
        />
        <input 
          type="url" 
          placeholder="Twitter Link" 
          value={twitterLink !== null ? twitterLink : ""} 
          onChange={(e) => setTwitterLink(e.target.value)} 
        />
        <input 
          type="url" 
          placeholder="Personal Website Link" 
          value={personalWebsiteLink !== null ? personalWebsiteLink : ""} 
          onChange={(e) => setPersonalWebsiteLink(e.target.value)} 
        />
      </UsersData>
      <button 
        type="submit" 
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[100px]"
        onClick={handleUpdate}
      >
        Update
      </button>
    </Section>
  );
}
const Section = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
  input, textarea{
  background:transparent;
  padding:0.5rem 1rem;
  border-radius:5px;
  border:1px lightgray solid;
  width:50%;
}
`

const Image = styled.div`
background:white;
width:200px;
height:200px;
display:flex;
align-items:center;
justify-content:center;
font-size:34px;
border-radius:5px;
border:1px lightgray solid;
position:relative;
z-index:-1;
`

const UsersData = styled.div`
display:flex;
flex-direction:column;
gap:1rem;
justify-content:center;
`