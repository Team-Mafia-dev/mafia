import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <CardContainer>
      <CardHeader>
        <Icon />
        FANATIC
      </CardHeader>
      <ImageContainer />
      <TextContainer>
        <MainText>"그분께서 나를 선택하셨다!"</MainText>
        <AbilityText>
          [추종] 밤마다 플레이어를 선택하여 포교된 상태인지 확인하고, 포교일 경우 자신이 포교된다.<br />
          [사도] 교주가 사망했을 경우 자신이 교주의 능력을 이어받는다.
        </AbilityText>
      </TextContainer>
    </CardContainer>
  );
};

export default Card;

// 카드 전체 스타일
const CardContainer = styled.div
`
  width: 300px;
  background-color: #222;
  border: 3px solid #444;
  border-radius: 8px;
  padding: 8px;
  color: #fff;
  font-family: Arial, sans-serif;
`;

const CardHeader = styled.div
`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #333;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: bold;
  color: #ccc;
`;

const Icon = styled.div
`
  width: 20px;
  height: 20px;
  background-image: url('/path-to-icon.png'); // 실제 아이콘 경로로 대체
  background-size: cover;
  margin-right: 8px;
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

const AbilityText = styled.div
`
  font-size: 0.9em;
  color: #bbb;
`;