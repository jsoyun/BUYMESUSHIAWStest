import React, { useEffect, useState } from "react";
import "./Board.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../services/date-format";
import { BoardError } from "../../../redux/constants/BoardError";
import { errorHandler } from "../../../services/error-handler";
import BoardBtn from "../BoardPage/BoardBtn";

function ArticleList() {
  // const [articleList, setArticleList] = useState([]);
  const toBoardWrite = () => {
    // console.log('글 작성 클릭');
    window.location.href = '/BoardWrite';
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_REQUEST_URL}/api/article/getlist?start=1&end=100`
      )
      .then((response) => {
        errorHandler(response.data.data);
        // setArticleList(response.data.data);
      });
  }, []);
  return (
    <div className="board">
      <div className="header">
        <div className="wrapper">
          <div className="title">UsEarth</div>
          <div className="desc">환경지키미들의 자유로운 글을 적어주세요</div>
        </div>
      </div>
      <div className="article">
        <div className="wrapper">
          <table>
            <thead><h1>자유게시판</h1></thead>
            {/* <form action="/board" method="POST"> */}
            <tbody>
              <tr>
                <th className="num">게시글 번호</th>
                <th>제 목</th>
                <th>작성자</th>
                <th className="views">조회수</th>
              </tr>
              {/* 이 아래에 map 함수로 보여주기 */}
              {/* {% for comment in comments %} */}
              <tr>
                <td className="board-list-num">
                  <div>
                    {/* {{comment.id}} */}
                  </div>
                </td>
                {/* 해당 타이틀을 가진 글의 세부내용으로 가기 */}
                <td className="board-list-content">
                  <div>
                    {/* <a className="board-list-content-link" id="{{comment.id}}" href="/boarddetail/{{comment.id}}">{{ comment.title }}</a> */}
                  </div>
                </td>
                {/* user모델과 연동해서 작성한 사람 nick이 뜰 수 있게 */}
                <td className="board-list-name">
                  <div>
                    {/* {{comment.User.nick}} */}
                  </div>
                </td>
                {/* 조회수로 수정 요망 */}
                <td className="viewcount">
                  {/* <div className="board-list-viewcount">{{ comment.viewcount }}</div> */}
                </td>
              </tr>

              <tr>
                <td className="num">0</td>
                <td className="title">
                  <p>건전한 대화 부탁드립니다.</p>
                </td>
                <td>관리자 일동</td>
                <td className="views">33</td>
              </tr>
              {/* </form> */}
            </tbody>

          </table>

          {/* boardwrite로 페이지를 넘겨주는 버튼 */}
          <div>
            <button className="boardwrite" onClick={toBoardWrite}>글 작성</button>
          </div>
          {/* 글 10개당 page 넘어가는 페이징 필요  */}
          {/* <div className="pages">
            <ul>
              <li className="active">
                <p>1</p>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;
