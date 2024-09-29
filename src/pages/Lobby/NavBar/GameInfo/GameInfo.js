import React from 'react';
import styled from 'styled-components';
import Collapsible from "../../../../components/Collapsible/Collapsible"

const GameInfo = ({ closeGameInfoModal }) => {
  // 모달창 닫히는 함수 props로 가져오기
  return (
    <>
      <ModalOutside onClick={closeGameInfoModal} />
      {/* 바깥 영역 클릭 시 함수 작동하여 모달창 닫힘 */}
      <SelectWrapper onClick={(e) => e.stopPropagation()}>
        {/* 모달창 자체를 클릭하면 모달창이 닫히지 않게 */}
        <section className='game-info-section'>
          
          <h2>게임 설명</h2>

          <p>핵심 내용</p>
          <Collapsible title={"게임 진행 방식"}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Collapsible>

          <p>그 외 내용</p>
          <Collapsible title={"직업 설명"}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Collapsible>
          <Collapsible title={"꿀팁"}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Collapsible>
        </section>
      </SelectWrapper>
    </>
  );
};

export default GameInfo;

// 스타일링된 컴포넌트 정의
const ModalOutside = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  
`;

const SelectWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;
