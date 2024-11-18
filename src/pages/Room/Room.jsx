import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "context/userContext";
import { SystemContext } from "context/systemContext";
import { PlayerListContext } from "context/playerListContext";
import useWebSocket from "./Hooks/useWebSocket";

import Collapsible from "components/Collapsible/Collapsible";
import MessageContainer from "./MessageContainer/MessageContainer";
import InputField from "./InputField/InputField";
import Card from "./Card"
import EventCard from "./EventCard"
import ClickableBox from "components/ClickableBox/ClickableBox";
import { useCookies } from 'react-cookie';
import { GameState } from "./GameState";

// 메인 채팅 컴포넌트
const Room = () => {
  const navigate = useNavigate();
  const ROUND_TIME = 10; // 각 라운드 시간 (초 단위)
  const storedUser = localStorage.getItem('user');

  const [messages, setMessages] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]); //시스템 메시지 담을 변수
  const [roleModalCondition, setRoleModalCondition] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 상태
  const timerRef = useRef(null); // 타이머 참조

  const { user, setUser } = useContext(UserContext);
  const { playerList, setPlayerList,} = useContext(PlayerListContext); //PlayerListContext 정보 접근
  const { dayAndNight,setDayAndNight,} = useContext(SystemContext); //systemContext 정보 접근

  const [roomNumCookies] = useCookies(['roomNum']); // 쿠키 값 가져오기 인자로는 key값을 입력하면됨

  // demo 파일 
  const [playerListDemo, setPlayerListDemo] = useState([]);
  useEffect(() => {
    // JSON 파일 가져오기
    fetch('/data/playerListDemo.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPlayerListDemo(data.playerNoInfos); // 데이터 상태에 저장
      })
      .catch((error) => {
        console.error('JSON 파일을 가져오는데 실패했습니다:', error);
      });
  }, []);
  //console.log("playerListDemo",playerListDemo)
  
  // 서버에서 타임스탬프 찍어줌
  // const getCurrentTime = () => {
  //   const now = new Date();
  //   return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  // useEffect(()=>{
  //   // 타이머 시작 함수 (useRef로 타이머 관리)
  //   const startTimer = () => {
  //     timerRef.current = setInterval(() => {
  //       setTimeLeft((prevTime) => {
  //         if (prevTime <= 1) {
  //           handleRoundChange(); // 라운드 전환
  //           return ROUND_TIME; // 새로운 라운드 시작
  //         }
  //         return prevTime - 1; // 매초 감소
  //       });
  //     }, 1000);
  //   };
  //   startTimer();

  //   // 라운드 전환 함수
  //   const handleRoundChange = () => {
  //     setDayAndNight((prev) => !prev); // 낮/밤 전환
  //   };
  //   return () => clearInterval(timerRef.current); // 컴포넌트 언마운트 시 타이머 정리
  // }, [setDayAndNight]);

  const openRoleModal = () => setRoleModalCondition(prev => !prev);
  const handleRoundChange = () => setDayAndNight(prev => !prev);
  const [activeTab, setActiveTab] = useState("profile"); // 활성 탭 관리
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  

  const callBackSetTime = (res) => {
    setTime(res.data);
  };

  // 메시지를 수신했을 때 처리
  const callBackMessageReceived = (res) => {
    const message = res.data;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: message.text,
        isOwner: message.isOwner,
        username: message.userName,
        profileImage: user.profileImage, // 유저이미지를 숫자나 text로 가지고 와서 프로필이미지 매니저같은 곳에서 가져오기 message.profileImage || "",
        timestamp: message.getCurrentTime,
      },
    ]);
  };

  // 서버에 해당 유저 정보 등록을 위한 전송
  const callBackConnect = () => {
    console.log(storedUser);
    // 희성 TODO : 새로고침하면 여전히 유저 데이터가 안들어옴
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // 이렇게 하면 되긴함. 
    const userTmp = JSON.parse(storedUser);
    console.log(userTmp);

    const userInfo = {
      userId : userTmp.id,
      userName : userTmp.name,
      profileImage : userTmp.profileImage,
      roomId : roomNumCookies.roomNum 
    }
    console.log("handleConnect data:",userInfo)
    sendToSocket(process.env.REACT_APP_SOCKET_REGISTER_USER, userInfo);
  }

  const callBackSetGameState = (res) => {
    console.log(res.data);
    const data = res.data;
    const leftTime = data.leftTime;

    setTime(leftTime)

    const msg = GameState(data.resultCode, data.playerNoInfo);

    console.log(msg);
  }

  // 게임 시작 버튼 콜백
  const callBackGameStart = (res) => {
    console.log(res.data);

    const data = res.data;
    const roleNo = data.roleNo; // 0 : 시민, 1 : 마피아, 2 경찰, 3 의사
    const timeLeft = data.timeLeft; // 남은 시간

    setTime(timeLeft);
  } 

  // 서버에서 유저에게 방에서 나가라는 메시지
  const callBackLeaveRoom = () => {
    socketDisconnect();
    navigate('/lobby');
  }

  // 방에 있는 플레이어 정보를 받아온다(완료했으니 적용)
  const callBackSetPlayerInfos = (res) => {
    // 희성 TODO : 다른 플레이어 리스트도 playerListContext 같이 만들어서 관리해주면 될 것 같다.
    // 데이터가 어떻게 생겼는지는 게임 들어가서 콘솔 찍어보면 나와
    setPlayerList(res.data);
  }

  const setTime = (timeLeft) => {
    // 희성 TODO : 여기서 유저 역할에 따라서 각 유저한테 시스템 메시지나 이미지 창으로 알려주기

    setTimeLeft(timeLeft);

    // 기존 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }  

    timerRef.current = setInterval(() => {
      // 희성 TODO : 시간을 180,179... 이 아닌 3:00, 2:59 ... 이런식으로 변환시켜서 보여주기
      setTimeLeft((prevTime) => {
        // if (prevTime <= 1) {
        //   handleRoundChange(); // 라운드 전환
        //   return ROUND_TIME; // 새로운 라운드 시작
        // }
        if(prevTime > 0){
          return prevTime - 1; // 매초 감소
        }else
          return 0;
      });
    }, 1000);
  }

  // WebSocket 훅 사용
  const { socketConnect, sendToSocket, socketDisconnect } = useWebSocket({
    onConnect: callBackConnect,
    CHAT_MESSAGE: callBackMessageReceived,
    SET_PLAYERINFOS: callBackSetPlayerInfos,
    LEAVE_ROOM: callBackLeaveRoom,
    GAME_START: callBackGameStart,
    SET_TIME: callBackSetTime,
    SET_GAME_STATE : callBackSetGameState,
  });
  
  useEffect(()=>{
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Context에 저장된 사용자 정보 복구 새로고침시 데이터 유지
    }
    console.log("user data in room",user);
    const roomNum = roomNumCookies.roomNum;
    console.log('쿠키에서 가져온 값:', roomNum);

    if (!roomNum) {
      alert('방 번호가 없습니다. 로비로 이동합니다.');
      navigate('/lobby'); // 방 번호가 없으면 로비로 이동
    }
    socketConnect();
  },[roomNumCookies.roomNum, navigate, socketConnect]);

  // 메시지 보내기
  const handleSendMessage = (message) => {
    // 사용자의 메시지로 추가
    const newMessage = {
      text: message
    }
    
    // 메시지 전송
    sendToSocket(process.env.REACT_APP_SOCKET_CHAT_MESSAGE, newMessage);
  };

  // 방 떠나기
  const handleLeave = () => {
    if(window.confirm("정말 게임을 떠나시겠습니까?")){
      sendToSocket(process.env.REACT_APP_SOCKET_LEAVE_ROOM);
      socketDisconnect();
      navigate('/lobby');
    }else {
      return;
    }
  }

  // 게임 시작
  const handleStart = () =>{
    sendToSocket(process.env.REACT_APP_SOCKET_GAME_START);
  }
  console.log(playerList.playerNoInfos[0])
  return (
    <PageContainer $dayAndNight={dayAndNight}>
      <StyledChatContainer>
        <MessageContainer messages={messages} />
        <EventCard/>
        <InputField onSend={handleSendMessage} />
      </StyledChatContainer>
  
      <RoomInfoSection>
        <CardWrapper>
          
        </CardWrapper>
        <RoomBtn onClick={handleStart}>시작하기</RoomBtn>
        <RoomBtn onClick={openRoleModal}>직업확인</RoomBtn>
        <h2>{dayAndNight ? "밤이 되었습니다.":"낮이 되었습니다."}</h2>
        <div className="round-time">남은 시간: {timeLeft}초</div>
        {/* Toggleable Tabs */}
        <TabWrapper>
          <TabButton
            isActive={activeTab === "profile"}
            onClick={() => handleTabClick("profile")}
          >
            프로필
          </TabButton>
          <TabButton
            isActive={activeTab === "memo"}
            onClick={() => handleTabClick("memo")}
          >
            메모
          </TabButton>
        </TabWrapper>

        <ContentWrapper>
          {activeTab === "profile" && (
            <ProfileBox>
              {playerListDemo.map((player) => (
                <ClickableBox
                  key={player.playerNo}
                  playerNo={player.playerNo}
                  playerName={player.playerName}
                />
              ))}
            </ProfileBox>
          )}
          {activeTab === "memo" && (
            <MemoContent>
              <p>참여한 플레이어들 수 만큼 체크박스 이미지들이 들어갈 예정</p>
            </MemoContent>
          )}
        </ContentWrapper>
        <RoomBtn onClick={handleLeave}>나가기</RoomBtn>
      </RoomInfoSection>
      {roleModalCondition && (
      <Card
      closeRoleModal={() => setRoleModalCondition(!roleModalCondition)}/>
      )}
    </PageContainer>
  );
};

export default Room;


// 스타일 정의
const PageContainer = styled.div
`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: ${(props) => (props.$dayAndNight ? "#444a4f" : "#f1f1f1")};
  padding: 10px;
  gap: 5%;
`;

const StyledChatContainer = styled.div
`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;

  @media (max-width: 768px) {
    height: 90vh;
    width: 100%;
  }
`;

// 오른쪽 정보화면 스타일
const RoomInfoSection = styled.section
`
  width: 400px;
  padding: 10px
`
const CardWrapper = styled.div
`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px; // 필요에 따라 여백 추가
`;

const RoomBtn = styled.button
`
  position: relative;
  background: #222;
  color: #fff;
  z-index: 1;
  overflow: hidden;
  border: none;
  padding: 10px 20px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;

  &::after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: #ff6161;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #1a1a1a;
  }

  &:hover::after {
    left: 0;
    width: 100%;
  }

  &:active {
    top: 2px;
  }
`;

const ProfileBox = styled.div
`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 35px;
`
const TabWrapper = styled.div
`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
`;

const TabButton = styled.button
`
  flex: 1;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#ddd" : "#f9f9f9")};
  border: none;
  border-bottom: ${(props) => (props.isActive ? "2px solid black" : "2px solid transparent")};

  &:hover {
    background-color: #eee;
  }
`;
const ContentWrapper = styled.div
`
  padding: 5px;
  height: 565px;
`;
const MemoContent = styled.div
`
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
`;