import React from 'react';
import styled from 'styled-components';

// IconBox 컴포넌트
const IconBox = ({ playerNo, playerName }) => {
  return (
    <BoxContainer>
      <IconWrapper>
        {/* <Icon src={icon} alt="icon" /> */}
        {playerNo}
      </IconWrapper>
      <Label>{playerName}</Label>
    </BoxContainer>
  );
};

export default IconBox;

// 스타일 정의
const BoxContainer = styled.div
`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;  // 박스 너비 조정
  padding: 10px;
  border-radius: 8px;
  background-color: #f0f0f0;  // 필요시 배경색 조정
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const IconWrapper = styled.div
`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img
`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const Label = styled.p
`
  font-size: 14px;
  text-align: center;
  color: #333;
`;

