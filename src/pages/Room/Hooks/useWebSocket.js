import { useEffect, useRef } from "react";

const useWebSocket = (eventHandlers) => {
  const socketRef = useRef(null);

  // WebSocket 연결 및 메시지 수신 처리
  useEffect(() => {
    console.log("WebSocket 연결 시도");
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
      // 연결 해제 시 재연결 시도
      setTimeout(() => {
        console.log("WebSocket 재연결 시도 중...");
        socketRef.current = new WebSocket(`ws://localhost:8080/ws`);
      }, 1000); // 1초 후 재연결
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

  const sendToSocket = (type, content) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const contentWithType = {
        type: type,
        ...content
      }
      socketRef.current.send(JSON.stringify(contentWithType));
    } else {
      console.error("WebSocket이 열려 있지 않습니다. 메시지가 전송되지 않았습니다:", content);
    }
  }

  return { sendToSocket };
};

export default useWebSocket;
