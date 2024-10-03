import React, {useState} from 'react';
import styled from 'styled-components';
import { FetchData } from "components/Util/FetchData";
import "./CreateRoom.css"

 

const CreateRoom = ({ closeCreateRoomModal }) => {
  // 모달창 닫히는 함수 props로 가져오기

  //전체적인 흐름 완성되면 디테일 추후 구현 예정
  //예)공개/비공개 여부, 비밀번호, 제한 인원수 상태변수 추가해서 진행
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setError("방제목을 입력해주세요.");
      return;
    }
    // 방 생성을 완료해서 데이터 후처리 해야함.
    //createRoom(title);
    RegisterRoom();
  };

  // 방 생성하기
  const RegisterRoom = async () => {
    // TODO 방 이름 파라미터로 받아서 대입시키기
    const postData = { roomName: title };
    const result = await FetchData("room/register", postData);

    if (result.isSuccess) {
      alert("방 생성을 완료하였습니다.");
      // TODO 게임 화면으로 이동
    }
  };

  return (
    <>
      <ModalOutside onClick={closeCreateRoomModal} />
      {/* 바깥 영역 클릭 시 함수 작동하여 모달창 닫힘 */}
      <SelectWrapper onClick={(e) => e.stopPropagation()}>
        {/* 모달창 자체를 클릭하면 모달창이 닫히지 않게 */}
        <section className='title-section'>
          <form className="CreateRoom-form" onSubmit={handleSubmit}>
            <h2>방만들기</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="input-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="방제목을 입력하세요"
              />
            </div>
            <button type="submit" className="create-button">
              완료
            </button>
          </form>
        </section>
      </SelectWrapper>
    </>
  );
};

export default CreateRoom;

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
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;
