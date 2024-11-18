import { useCallback, useEffect, useRef } from "react";

const useWebSocket = (eventHandlers) => {
  const socketRef = useRef(null);
  const isManuallyClosedRef = useRef(false); // 수동으로 연결을 끊었는지 여부를 추적

  const socketConnect = useCallback(() => {
    console.log("WebSocket 연결 시도");
    isManuallyClosedRef.current = false; // 연결을 수동으로 끊지 않았을 때

    // WebSocket 연결
    socketRef.current = new WebSocket(`ws://localhost:8080/ws`);

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결됨");
      if (eventHandlers.onConnect) {
        eventHandlers.onConnect();
      }
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("메시지 수신:", message);

      if (message.type && eventHandlers[message.type]) {
        // 메시지 타입에 맞는 핸들러 호출
        eventHandlers[message.type](message);
      } else {
        console.error("등록되지 않은 메시지 타입 또는 기본 핸들러가 없습니다.", message);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket 연결 해제됨");

      // 수동으로 끊은 게 아니면 재연결 시도
      if (!isManuallyClosedRef.current) {
        setTimeout(() => {
          console.log("WebSocket 재연결 시도 중...");
          socketConnect(); // 재연결
        }, 1000); // 1초 후 재연결
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };
    
    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const socketDisconnect = useCallback(() => {
    if (socketRef.current) {
      console.log("수동으로 WebSocket 연결을 끊습니다.");
      isManuallyClosedRef.current = true; // 수동으로 연결 끊음
      socketRef.current.close(); // 연결 해제
    }
  }, []);


  const sendToSocket = (type, content = null) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      let contentWithType;
      if(content != null){
        contentWithType = {
          type: type,
          ...content
        }
      }
      else{
        contentWithType = {
          type: type
        }
      }
      socketRef.current.send(JSON.stringify(contentWithType));
    } else {
      console.error("WebSocket이 열려 있지 않습니다. 메시지가 전송되지 않았습니다:", content);
    }
  }

  return { socketConnect, sendToSocket, socketDisconnect };
};

export default useWebSocket;
