"use client"

import styled from "styled-components"
import  Loading from "@/universal/Loading"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from '@/context/AuthContext';
import { getUserDocument, updateUserDocument } from "@/db/account"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import SettingsGeneral from "@/components/settings/SettingsGeneral"
import SettingsAuth from "@/components/settings/SettingsAuth"
import { AccountTemplate } from "@/types/Templates"

export default function SettingsMain() {
  const { user, setPhotoUrl } = useAuth();
  const [userData, setUserData] = useState<AccountTemplate | null>(null)
  const [selectedSection, setSelectedSection] = useState('General');
  const router = useRouter();
  
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [previewImageLink, setPreviewImageLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [personalWebsiteLink, setPersonalWebsiteLink] = useState('');

  useEffect(()=>{
    const getUserData = async () => {
      const userDocumentData = await getUserDocument(user.uid);
      if(userDocumentData.success){
        setUserData(userDocumentData.payload)
        setBio(userDocumentData.payload.bio);
        setName(userDocumentData.payload.name);
        setPreviewImageLink(user.photoURL);
        setFacebookLink(userDocumentData.payload.facebook);
        setGithubLink(userDocumentData.payload.github);
        setTwitterLink(userDocumentData.payload.twitter);
        setPersonalWebsiteLink(userDocumentData.payload.websiteLink);
      } else {
        toast("Cannot get user data!", { type :"error" })
      }
    }
    getUserData()
  },[user.uid])
  
  const handleUpdate = async () => {
    const data = {
      bio,
      websiteLink: personalWebsiteLink,
      facebook: facebookLink,
      twitter: twitterLink,
      github: githubLink,
    };

    try {
      const result = await updateUserDocument(user.uid, data);
      await setPhotoUrl(previewImageLink)
      if (result.success) {
        toast("User data updated successfully!", { type: "success" });
        router.push("/settings");
      } else {
        toast(result.error, { type: "error" });
      }
    } catch (error) {
      console.log(error);
      toast("An error occurred while updating user data.", { type: "error" });
    }
  };
  
  if(!userData){
    return <Loading />
  }
  
  return (
    <Main>
      <Menu>
        <button onClick={() => setSelectedSection('General')}>General</button>
        <button onClick={() => setSelectedSection('Profile & Auth')}>Profile & Auth</button>
     </Menu>
      <Show>
        <h1>{selectedSection}</h1>
        {selectedSection === 'General' && (
          <SettingsGeneral
            bio={bio}
            setBio={setBio}
            name={name}
            setName={setName}
            previewImageLink={previewImageLink}
            setPreviewImageLink={setPreviewImageLink}
            facebookLink={facebookLink}
            setFacebookLink={setFacebookLink}
            githubLink={githubLink}
            setGithubLink={setGithubLink}
            twitterLink={twitterLink}
            setTwitterLink={setTwitterLink}
            personalWebsiteLink={personalWebsiteLink}
            setPersonalWebsiteLink={setPersonalWebsiteLink}
            handleUpdate={handleUpdate}
          />
        )}
        {selectedSection === 'Profile & Auth' && (
          <SettingsAuth  />
        )}
      </Show>
    </Main>
  )
}

const Show = styled.div`
h1{
font-size:35px;
margin-bottom: 1rem;
}
`

const Menu = styled.div`
display:flex;
flex-direction: column;
gap:1.5rem;
padding:1rem 0.5rem;
background:white;
border-right: 1px solid #cd5334ff;
border-radius:5px 0px 0px 5px;
height:100vh;
position:sticky;
top:1rem;
button{
  padding:0.5rem 1rem;
  border-radius:5px;
  background:#cd5334ff;
  color: white;
}
  @media only screen and (max-width: 768px) {
    height: auto;
    position:static;
  }
`

const Main = styled.div`
  background: #f1f1f16d;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  padding:1rem 0.5rem;
  grid-column-gap: 2rem;
  grid-row-gap: 0px; 
  @media only screen and (max-width: 768px) {
    display:flex;
    flex-direction:column;
  }
`;