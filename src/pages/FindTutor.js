import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import '../css/style.css';
import { Button, Form } from 'react-bootstrap';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';


class FindTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            gender: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);


    }



    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };





    onSubmit = async (e) => {
        e.preventDefault();
    
        window.location.href=`/FindTutor/${this.state.subject}/${this.state.gender}`


    } //onClick

    render() {

        return (
            <div>
                <div>

                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="/FindTutor">선생님찾기</a>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li><a href="/registerStudent">학생등록하기</a></li>

                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                    <li><a><strong>{sessionStorage.getItem('account')}</strong>님 반갑습니다!</a></li>
                                    <li><a href="/logout">로그아웃</a></li>
                                </ul>

                            </div>
                        </div>
                    </nav>

                </div>
                <div class="find-section">
                    <div class="header">
                        <h1>과목별 선생님찾기</h1>
                        <h2>블록체인에 등록되어있는 선생님을 찾아보아요!</h2>
                        <hr></hr>
                    </div>
                    <Form class="find-form" onSubmit={this.onSubmit} inline >

                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                            과목
                         </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            name="subject"
                            onChange={this.handleChange}
                            custom
                        >
                            <option value="">과목선택</option>
                            <option value="korean">언어</option>
                            <option value="math">수리</option>
                            <option value="english">외국어</option>
                        </Form.Control>

                        <br></br>
                        <br></br>

                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                            선생님 성별
                         </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            name="gender"
                            onChange={this.handleChange}
                            custom
                        >
                            <option value="">선생님 성별</option>
                            <option value="male">남</option>
                            <option value="female">여</option>
                        </Form.Control>
                        <br></br>
                        <br></br>

                        <Button type="submit" className="my-1">
                            선생님찾기
                        </Button>


                    </Form>

                </div>
            </div>
        )

    }
}

export default FindTutor;
