import React from 'react';
import styled from 'styled-components';

const EventCard = () => {
  return (
    <CardWrapper>
      <CardContainer>
        <ImageContainer />
        <TextContainer>
          <MainText>`[userName]가 살해당하였습니다.`</MainText>
        </TextContainer>
      </CardContainer>
    </CardWrapper>
  );
};

export default EventCard;

// 카드 전체 스타일
const CardWrapper = styled.div
`
  display:flex;
  justify-content: center;
`
const CardContainer = styled.div
`
  width: 95%;
  background-color: #222;
  border: 3px solid #444;
  border-radius: 8px;
  padding: 8px;
  color: #fff;
  font-family: Arial, sans-serif;
`;

const ImageContainer = styled.div
`
  width: 100%;
  height: 200px;
  margin: 8px 0;
  background-image: url('/path-to-character-image.png'); // 실제 캐릭터 이미지 경로로 대체
  background-size: cover;
  background-position: center;
  border: 2px solid #666;
  border-radius: 5px;
`;

const TextContainer = styled.div
`
  padding: 8px;
  background-color: #222;
  border-radius: 5px;
  color: #ddd;
`;

const MainText = styled.div
`
  font-size: 1em;
  margin-bottom: 8px;
  font-style: italic;
`;