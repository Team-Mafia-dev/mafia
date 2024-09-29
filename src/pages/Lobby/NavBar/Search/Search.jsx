import React, {useState} from "react";

function Search() {

  return (
    <>
      <form action="" className="search-from-container">{/* url 활용해서 검색 가능 */}
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </>
  );
}

export default Search;
