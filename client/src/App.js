import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";
//import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
import About from "./components/views/AboutPage/About";
import Play from "./components/views/MinigamePage/Hangman";
import Board from "./components/views/BoardPage/Board";
import BoardWrite from "./components/views/BoardPage/BoardWrite";
import Footer from "./components/views/Footer/Footer";
//page

import HomeScreen from "./components/views/ShoppingPage/HomeScreen";
import ProductScreen from "./components/views/ShoppingPage/ProductScreen";
// import MyPage from "./components/views/ShoppingPage/MyPage";
import MyPage from "./components/views/MyPage/MyPage";
//쇼핑목록 안 components
import AuthBoard from "./components/views/AuthBoard/AuthBoard";
import { HomeWorkSharp } from "@material-ui/icons";
import Profile from "./components/views/ProfilePage/Profile";
// 추후 삭제

import { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }`;

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ marginTop: "9.6vh" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/about" component={Auth(About, null)} />

          {/* usEarth 페이지 추후 null -> true로 변경 */}
          <Route exact path="/authboard" component={Auth(AuthBoard, true)} />
          {/* <Route exact path="/shop" component={Auth(About, null)} /> */}
          <Route
            exact
            // path="/products"
            path="/product"
            component={Auth(HomeScreen, true)}
          />
          <Route
            exact
            // path="/products/:id"
            path="/product/:id"
            component={Auth(ProductScreen, true)}
          />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/profile/:id" component={Auth(Profile, true)} />
          <Route exact path="/play" component={Auth(Play, true)} />
          <Route exact path="/board" component={Auth(Board, null)} />
          {/* <Route exact path="/write" component={Auth(WriteBoard, null)} /> */}
          <Route
            path="/article/:articleId"
            // render={() => <Article component={Auth(MyPage, null)} />}
            exact
          />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default observer(App);
