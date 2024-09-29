import React from "react";
import { FetchData } from "components/Util/FetchData";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomState: "unPlaying",
      searchType: "isPlaying",
      searchData: "",
      latestSort: false,
    };
  }

  //토글 핸들러
  toggleHandler = () => {
    this.setState((prevState) => ({ latestSort: !prevState.latestSort }));
  };
  // 게임 시작 여부로 룸 리스트 가져오기
  SearchIsStarted = (paramStateType) => {
    this.setState({ searchType: paramStateType });

    const queryParams = new URLSearchParams();
    queryParams.append("stateType", paramStateType);

    this.GetRoomList(queryParams);
  };
  // 방 정보 검색으로 방 데이터 가져오기
  SearchRoomData = () => {
    const queryParams = new URLSearchParams();
    if (this.state.stateType) {
      queryParams.append("stateType", this.state.stateType);
    }
    if (this.state.searchType) {
      queryParams.append("searchType", this.state.searchType);
    }
    if (this.state.searchData) {
      queryParams.append("searchData", this.state.searchData);
    }
    this.GetRoomList(queryParams);
  };
  
  // 방 정보 가져오기
  GetRoomList = async (queryParams) => {
    const result = await FetchData(`room/list?${queryParams}`);
    console.log();
    if (result.isSuccess) {
      console.log(result.data);
    }
  };
  //DOM 마운트 될때 실행
  componentDidMount() {}
  //DOM 언마운트 될때 실행
  componentWillUnmount() {}
  render() {
    return (
      <container className="search-container">
        {/* <div className="Search-bar">
          <select
            value={this.state.searchType}
            onChange={(e) => this.setState({ setSearchType: e.target.value })}
          >
            <option value="0">방 번호</option>
            <option value="1">방 이름</option>
            
          </select>

          <input
            type="text"
            value={this.state.searchData}
            onChange={(e) => this.setState({ searchData: e.target.value })}
            placeholder="검색 데이터 입력"
          />
          <Button onClick={this.SearchRoomData} >검색</Button>
        </div> */}
      </container>
    );
  }
}

export default Search;
