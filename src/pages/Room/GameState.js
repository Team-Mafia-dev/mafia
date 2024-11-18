export const GameState = (code, playerInfo) =>{

    // 1 : 밤이 되었습니다.
	
	// 11 : 밤에 아무 일도 일어나지 않음
	// 12 : 살인
	// 13 : 의사가 구함
	
	// 21 : 투표 시작
	
	// 31 : 투표 과반수 발생
	// 32 : 투표 동점 발생
	
	// 41 : 처형 투표를 시작합니다
	
	// 51 : 사형
	// 52 : 생존

    let playerNo;
    let name;
    let target;
    console.log(playerInfo);
    if(playerInfo !== null){
        playerNo = playerInfo.playerNo;
        name = playerInfo.playerName;
    }else{
        playerNo = -1;
        name = "비어있음";
    }
    target = `${playerNo} ${name}`;
    let msg;

    if(code === 11){
        msg ="밤에 아무 일도 일어나지 않았습니다.\n아침이 되었습니다.";
    }
    else if(code === 12){
        msg = `${target}님이 살해당하셨습니다.\n아침이 되었습니다.`;
    }
    else if(code === 13){
        msg = `${target}님이 위협을 당했지만 의사가 살렸습니다.\n아침이 되었습니다.`;
    }
    else if(code === 21){
        msg = `처형 투표를 시작합니다.`;
    }
    else if(code === 31){
        msg = `${target}님이 과반수의 표를 받았습니다. 최후의 변론을 해 주세요.`;
    }else if(code === 32){
        msg = "투표가 무효로 진행되었습니다.";
    }else if(code === 41){
        msg = `${target}님의 처형 투표를 시작합니다.`
    }else if(code === 51){
        msg = `${target}님이 처형되었습니다.\n밤이 되었습니다.`;
    }else if(code === 52){
        msg = "밤이 되었습니다.";
    }

    return msg;
}