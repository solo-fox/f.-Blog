"use client"

import styled from 'styled-components';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardInsights from '@/components/dashboard/DashboardInsights';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { getUserDocument } from "@/db/account";
import { AccountTemplate } from "@/types/Templates";
import { toast, ToastContainer } from "react-toastify";
import Loading from "@/universal/Loading";

export default function DashboardMain() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<AccountTemplate | null>(null);
  
  useEffect(() => {
    const getUserData = async () => {
      const result = await getUserDocument(user.uid);
      if(result.success) {
        setUserData(result.payload);
      } else {
        console.log(result.error);
        toast(result.message, { type: "error" });
      }
    };
    getUserData();
  }, [user.uid]);
  
  if(!userData) {
    return <Loading />;
  }
  
  return (
    <Main>
      <ToastContainer />
      <DashboardHeader 
        name={userData.name} 
        facebook={userData.facebook} 
        twitter={userData.twitter} 
        github={userData.github} 
        websiteLink={userData.websiteLink} 
      />
      <DashboardContent bio={userData.bio} likes={userData.likes} followers={userData.followers.length} blogs={userData.blogs} />
      <DashboardInsights uid={user.uid} activity={userData.activity} blogs={userData.blogs} />
    </Main>
  );
}

const Main = styled.div`
  background: #f1f1f16d;
  flex-grow: 1;
  padding: 2rem 4rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  min-height:100vh;
`;