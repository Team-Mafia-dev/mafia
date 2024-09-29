import React, {useContext} from "react";
import styled from "styled-components";
import { UserContext } from 'context/userContext';

const Profile = () => {
  const profileImage = process.env.PUBLIC_URL + "/images/newbi.jpg";
  const { user } = useContext(UserContext); // useContext로 유저 정보 접근
  return (
  <article className="Profile-article">
    <ProfileContainer>
      <ProfileImageTag src={profileImage} alt="user-profile-image"/>
      <div>{user.name}</div>
      <div>{user.winRate}승 / {user.loseRate}패</div>
    </ProfileContainer>
  </article>
  )
}

export default Profile

const ProfileContainer = styled.div`
  margin: 10px;
  padding: 10px;
  width: 200px;
  border: 1px solid black;
  background-color: aliceblue
`
const ProfileImageTag = styled.img`
  width: 100%;
`