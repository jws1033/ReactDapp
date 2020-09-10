import React from 'react';
import '../App.css';
import logo from '../logo.svg';
// import logo from './logo.svg';
// import TutorLogin from "./components/TutorLogin";

import { Button } from 'react-bootstrap';


const MainPage = ({ history }) => {
  return (

    <div className="App">
      <header className="App-header">
        <h1>
          React를 활용한 과외매칭DApp입니다
        </h1>
        <br></br>
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>

        <Button variant="info" size="lg" active onClick={() => {
          history.push('/TutorLogin')
        }}>
          선생님 로그인
        </Button>
        <br></br>

        <Button variant="info" size="lg" onClick={() => {
          history.push('/StudentLogin')
        }}>
          학생 로그인
        </Button>

      </header>
    </div>

  );
}

export default MainPage;
