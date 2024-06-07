import React from 'react';
import styled from 'styled-components';

export default function DashboardContent({ bio, blogs, likes, followers }: Readonly<{ bio: string | null, likes: number, followers: number, blogs: string[] | null }>) {
  return (
    <Content>
      <UserInfo>
        <UserCard>
          <UserContent>
            {!bio && <p>No Bio was found!</p>}
            <p>{bio && bio}</p>
          </UserContent>
        </UserCard>
      </UserInfo>
      <UserStats>
        <StatCard>
          <StatNumber>
            <p className="text-cyan-600">{blogs ? blogs.length : 0}+</p>
            <span>Blogs</span>
          </StatNumber>
        </StatCard>
        <StatCard>
          <StatNumber>
            <p className="text-red-400">{likes}+</p>
            <span>Likes</span>
          </StatNumber>
        </StatCard>
        <StatCard>
          <StatNumber>
            <p className="text-indigo-400">{followers}+</p>
            <span>Followers</span>
          </StatNumber>
        </StatCard>
      </UserStats>
    </Content>
  );
}

const StatNumber = styled.div`
  p {
    font-size: 43px;
  }
  span {
    color: lightgray;
  }
`;

const UserStats = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 50%;
  @media only screen and (max-width: 768px) {
    align-items:center;
    justify-content: center;
  }
`;

const UserContent = styled.div`
  display: flex;
  font-size: 16px;
  color: gray;
`;

const StatCard = styled.div`
  background: white;
  padding: 1rem 1rem;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const UserCard = styled.div`
  width: 100%;
  position: relative;
`;

const UserInfo = styled.div`
  width: 50%;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    display:flex;
    align-items:center;
    width:100%;
    justify-content: center;
    margin-bottom:2rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 1rem;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
