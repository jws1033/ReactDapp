import React, { Component } from "react";
import '../css/style.css';
import { Button, Form, Card } from 'react-bootstrap';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';




class ShowTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorArray: [],

        };
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        var array = new Array(); //전체 선생님들 정보를 저장하기 위한 임시 배열
        var array2 = new Array(); //전체 선생님들 중 특정 과목과 성별을 만족하는 선생님들을 필터링하여 저장하기 위한 임시 배열

        const totalTutors = await storehash.methods.getNumOfTutors().call({
            from: accounts[0]
        });

        for (var i = 0; i < totalTutors; i++) {
            const tutorInfo = await storehash.methods.getTutorInfo(i).call({
                from: accounts[0]
            });
            array.push(tutorInfo);
        }
        this.setState({
            tutorArray: array
        })
        this.state.tutorArray.map(tutors => {
            console.log(tutors[0]); //선생님 이름

            if (tutors[1] == this.props.match.params.gender && tutors[4] == this.props.match.params.subject) {
                array2.push(tutors);
            }


        })
        this.setState({
            tutorArray: array2
        })
        console.log(this.state.tutorArray)


    }









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
                <div class="section">
                    <div class="header">
                        <h2>선생님 리스트</h2>
                    </div>

                    
                        {this.state.tutorArray.map(tutors => (
                            <div class="col-lg-4">

                                <div class="card">



                                    <div class="card-image"></div>
                                    <div class="card-title">선생님 이름 : {tutors[0]}</div>
                                    <div class="card-comment">성별 : {tutors[1]}</div>
                                    <div class="card-comment">나이 : {tutors[2]}</div>
                                    <div class="card-comment">거주지 : {tutors[3]}</div>
                                    <div class="card-comment">담당과목 : {tutors[4]}</div>
                                    

                                    <hr></hr>


                                    <button class="btn btn-info newapply-btn" onClick={()=>{
                                        storehash.methods.getTutorResume(tutors[5]).send({
                                            from: sessionStorage.getItem('account'),
                                            value: web3.utils.toWei('5', "ether"),
                                        }).then((result)=>{
                                            console.log(result);
                                            window.location.href="http://gateway.ipfs.io/ipfs/"+`${tutors[5]}`;
                                        })
                                        
                                    }} >선생님 이력서 다운로드</button>
                                </div>



                            </div>
                        ))}



                   
                </div>
            </div>
        )
    }
}


export default ShowTutor;
